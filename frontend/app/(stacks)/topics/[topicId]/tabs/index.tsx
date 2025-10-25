import { renderTopicFeedItem } from '@/components/FeedArea/components/TopicFeedItem';
import { Colors } from '@/constants/Colors';
import { toSegmentedDate } from '@/constants/SegmentedDate';
import { useDebounce } from '@/hooks/useDebounce';
import { useInfinitePosts } from '@/hooks/useInfinitePosts';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, View } from 'react-native';
import { FeedArea } from '../../../../../components/FeedArea';
import { useCalendars } from 'expo-localization';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { useTopicInfo } from '@/hooks/useTopicInfo';
import { PostsHeader } from '@/components/PostsHeader';
import { DateItem } from '@/components/CustomDatePicker/components/DateItem';
import { useGlobalSearchParams } from 'expo-router';

export default function Posts() {
  const calendars = useCalendars();
  const calendar = calendars[0];
  const [chosenDate, setChosenDate] = useState<DateItem>({
    date: DateTime.now().startOf('day'), 
    ...toSegmentedDate(DateTime.now())
  });
  const routeParams = useGlobalSearchParams();
  const topicId = routeParams.topicId as string || '';
  const { data: topicInfo, isLoading: isTopicInfoLoading, isError: isTopicInfoError, error: topicInfoError } = useTopicInfo(topicId);
  const topicCreationDate = topicInfo?.data.createdAt;
  const topicTitle = topicInfo?.data.title;
  const debouncedChosenDate = useDebounce(chosenDate.date.toISODate(), 500);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfinitePosts({
    topicId: topicId || '',
    date: debouncedChosenDate || '',
    timezone: calendar.timeZone || 'UTC',
    enabled: !!topicId && !!debouncedChosenDate,
  });
  useRefreshOnFocus(refetch);
  // Flatten all pages of data and filter out undefined items
  const posts = useMemo(() => data?.pages.flatMap((page: any) => page.results) || [], [data]);

  return (
      <View style={styles.container}>
        <PostsHeader 
          title={topicTitle || 'Carregando...'} 
          chosenDate={chosenDate}
          setChosenDate={setChosenDate}
          topicCreationDate={topicCreationDate}
        />
        <FeedArea 
          data={posts} 
          renderItem={renderTopicFeedItem} 
          fadedEdges={{top:false, bottom:false}} 
          immersiveScreen={{top:false, bottom:true}} 
          navbarInset={true}
          additionalPadding={{top: 12, bottom: 4}}
          noHorizontalPadding={true}
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
    justifyContent:'space-between',
    backgroundColor: Colors.light.background[90],
    overflow: 'visible',
  },
});