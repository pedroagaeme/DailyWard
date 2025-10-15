import { CustomDatePicker } from '@/components/CustomDatePicker';
import { DateItem } from '@/components/CustomDatePicker/DateItem';
import { TopicFeedItem, renderTopicFeedItem } from '@/components/FeedArea/TopicFeedItem';
import { Colors } from '@/constants/Colors';
import { toSegmentedDate } from '@/constants/SegmentedDate';
import { useDebounce } from '@/hooks/useDebounce';
import { axiosPrivate } from '@/utils/api';
import { useTopics } from '@/utils/topicsContext';
import { DateTime } from 'luxon';
import { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FeedArea } from '../../../../components/FeedArea';
import { useFocusEffect } from 'expo-router';

export default function Posts() {
  const { topicState } = useTopics();
  const topicId = topicState?.id;
  const topicCreationDate = topicState?.creationDate;

  const [posts, setPosts] = useState<TopicFeedItem[]>([])
  const [chosenDate, setChosenDate] = useState<DateItem>({
    date: DateTime.now().startOf('day'), 
    ...toSegmentedDate(DateTime.now())
  });

  const debouncedChosenDate = useDebounce(chosenDate.date.toISODate(), 500);

  useFocusEffect(
    useCallback(
      () => {
      // Fetch posts from the backend
      const fetchPosts = async () => {
        try {
          if(!topicId || !debouncedChosenDate) return;
          const response = await axiosPrivate.get(
            `/users/me/topics/${topicId}/posts/${debouncedChosenDate}/`
          );
          setPosts(response.data);
        }
        catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      console.log('Fetching posts for date:', debouncedChosenDate);
      fetchPosts();
      }, [topicId, debouncedChosenDate])
  );

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