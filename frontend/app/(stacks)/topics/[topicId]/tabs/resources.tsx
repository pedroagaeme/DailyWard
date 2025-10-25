import { FeedArea } from "@/components/FeedArea";
import { renderResourcesFeedItem } from "@/components/FeedArea/components/ResourcesFeedItem";
import { Colors } from "@/constants/Colors";
import { useInfiniteResources } from "@/hooks/useInfiniteResources";
import { AddIcon } from "@/assets/images/add-icon";
import { router } from "expo-router";
import { ActivityIndicator, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useMemo } from "react";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { ResourcesHeader } from "@/components/ResourcesHeader";
import { useLocalSearchParams, useGlobalSearchParams } from 'expo-router';
import { useTopicInfo } from "@/hooks/useTopicInfo";

export default function Resources() {
    const localParams = useLocalSearchParams();
    const globalParams = useGlobalSearchParams();
    const topicId = globalParams.topicId as string || '';
    const { data: topicInfo, isLoading: isTopicInfoLoading, isError: isTopicInfoError, error: topicInfoError } = useTopicInfo(topicId);
    const topicTitle = topicInfo?.data.title;

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useInfiniteResources({
        topicId: topicId || '',
        enabled: !!topicId,
    });

    useRefreshOnFocus(refetch);
    // Flatten all pages of data and filter out undefined items
    const resources = useMemo(() => data?.pages.flatMap((page: any) => page.results || []) || [], [data]) ;
    
    return (
    <View style={styles.container}>
      <ResourcesHeader title={topicTitle || 'Carregando...'} />
      <View style={styles.sectionHeader}>
        <View style={styles.row}>
          <Pressable onPress={() => router.push({pathname:'/topics/[topicId]/resources/add-resource', params:{topicId:topicId}})} style={styles.button}>
            <AddIcon width={32} height={32}/>
          </Pressable>
        </View>
      </View>
      <FeedArea
        data={resources}
        renderItem={renderResourcesFeedItem}
        fadedEdges={{top: false, bottom: false}}
        immersiveScreen={{top: false, bottom: true}}
        additionalPadding={{top: 16, bottom: 16}}
        navbarInset={true}
        refreshControl={<RefreshControl refreshing={isFetchingNextPage} onRefresh={refetch} tintColor={Colors.light.primary} />}
        onEndReachedThreshold={0.2}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              color="blue"
              size="small"
              style={{ marginBottom: 5 }}
            />
          ) : null
        }
      />
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'stretch',
    justifyContent:'space-between',
    backgroundColor: Colors.light.background[90],
    overflow: 'visible',
  },
  sectionHeader: {
    gap:24,
    paddingBottom:8,
  },
  row: {
    paddingHorizontal:16,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  contentText: {
    fontFamily:'Inter_500Medium',
    fontSize: 20,
    lineHeight:20,
    color: Colors.light.text[5],
  },
  sectionTitle: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.light.text[5],
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.light.primary,
    padding: 8,
    gap: 4,
    borderRadius: 24,
    alignItems: 'center',
  },
});