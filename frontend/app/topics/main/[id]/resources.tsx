import { FeedArea } from "@/components/FeedArea";
import { renderResourcesFeedItem } from "@/components/FeedArea/components/ResourcesFeedItem";
import { ResourcesFeedItem } from "@/types";
import { Colors } from "@/constants/Colors";
import { useTopics } from "@/contexts";
import { useInfiniteResources } from "@/hooks/useInfiniteResources";
import { AddIcon } from "@/assets/images/add-icon";
import { router } from "expo-router";
import { ActivityIndicator, Pressable, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useCallback, useMemo } from "react";
import { useFocusEffect } from "expo-router";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";


export default function Resources() {
    const { topicState } = useTopics();
    const topicId = topicState?.id;

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
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Recursos</Text>
          <Pressable onPress={() => router.push('/topics/add-resource')} style={styles.button}>
            <AddIcon width={32} height={32}/>
          </Pressable>
        </View>
      </View>
      <FeedArea
        data={resources}
        renderItem={renderResourcesFeedItem}
        fadedEdges={{top: false, bottom: false}}
        immersiveScreen={{top: false, bottom: true}}
        additionalPadding={{top: 0, bottom: 16}}
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
    backgroundColor: Colors.light.background[100],
    overflow: 'visible',
    gap:16,
  },
  header: {
    gap:24,
    paddingTop:8,
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