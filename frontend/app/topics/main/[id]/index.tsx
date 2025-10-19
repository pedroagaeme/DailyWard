import { CustomDatePicker } from '@/components/CustomDatePicker';
import { DateItem } from '@/components/CustomDatePicker/components/DateItem';
import { renderTopicFeedItem } from '@/components/FeedArea/components/TopicFeedItem';
import { TopicFeedItem } from '@/types';
import { Colors } from '@/constants/Colors';
import { toSegmentedDate } from '@/constants/SegmentedDate';
import { useDebounce } from '@/hooks/useDebounce';
import { useInfinitePosts } from '@/hooks/useInfinitePosts';
import { useTopics } from '@/contexts';
import { DateTime } from 'luxon';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FeedArea } from '../../../../components/FeedArea';
import { useFocusEffect } from 'expo-router';
import { useCalendars } from 'expo-localization';

export default function Posts() {
  const { topicState } = useTopics();
  const topicId = topicState?.id;
  const topicCreationDate = topicState?.creationDate;
  const calendars = useCalendars();
  const calendar = calendars[0];
  const [chosenDate, setChosenDate] = useState<DateItem>({
    date: DateTime.now().startOf('day'), 
    ...toSegmentedDate(DateTime.now())
  });

  const debouncedChosenDate = useDebounce(chosenDate.date.toISODate(), 500);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts({
    topicId: topicId || '',
    date: debouncedChosenDate || '',
    timezone: calendar.timeZone || 'UTC',
    enabled: !!topicId && !!debouncedChosenDate,
  });

  // Flatten all pages of data
  const posts = data?.pages.flatMap((page: any) => page.data) || [];

  return (
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <CustomDatePicker 
              key={topicId}
              chosenDate={chosenDate} 
              setChosenDate={setChosenDate}
              topicCreationDate={DateTime.fromISO(topicCreationDate!)}
              />
          </View>
        </View>
        <FeedArea 
          items={posts} 
          renderItem={renderTopicFeedItem} 
          fadedEdges={{top:false, bottom:false}} 
          immersiveScreen={{top:false, bottom:true}} 
          navbarInset={true}
          additionalPadding={{top: 12, bottom: 4}}
          noHorizontalPadding={true}
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
  header: {
    backgroundColor: Colors.light.background[100],
    paddingTop:8,
    gap: 16,
    elevation: 2,
  },
});