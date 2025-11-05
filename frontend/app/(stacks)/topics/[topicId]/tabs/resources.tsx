import { FeedArea } from "@/components/FeedArea";
import { renderResourcesFeedItem } from "@/components/FeedArea/components/ResourcesFeedItem";
import { Colors } from "@/constants/Colors";
import { useInfiniteResources } from "@/hooks/useInfiniteResources";
import { ActivityIndicator, RefreshControl, StyleSheet, View } from "react-native";
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
});