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
import { useGlobalSearchParams, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from '@/components/IconButton';
import { AddIcon } from '@/assets/images/add-icon';

export default function Posts() {
  const calendars = useCalendars();
  const calendar = calendars[0];
  const [chosenDate, setChosenDate] = useState<DateItem>({
    date: DateTime.now().startOf('day'), 
    ...toSegmentedDate(DateTime.now())
  });
  const routeParams = useGlobalSearchParams();
  const topicId = routeParams.topicId as string || '';
  const insets = useSafeAreaInsets();
  const { data: topicInfo, isLoading: isTopicInfoLoading, isError: isTopicInfoError, error: topicInfoError } = useTopicInfo(topicId);
  const topicCreationDate = topicInfo?.data.createdAt;
  const topicTitle = topicInfo?.data.title;
  const debouncedChosenDate = useDebounce(chosenDate.date.toISODate(), 500);
  
  const [buttonBottomPadding, setButtonBottomPadding] = useState(0);

  const handleCreatePostPress = () => {
    router.push({pathname: "/(stacks)/topics/[topicId]/posts/create-post", params: {topicId: topicId}});
  };

  const handleButtonLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    // Calculate the padding needed: 
    // - Button height (64px)
    // - Gap between button and tab bar (50px)
    // - Extra space for comfortable scrolling (20px)
    // Total: height + 50
    const padding = height + 50; // 50px gap + 20px extra space
    setButtonBottomPadding(padding);
  };

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
          topicId={topicId}
        />
        <FeedArea 
          data={posts} 
          renderItem={renderTopicFeedItem} 
          fadedEdges={{top:false, bottom:false}} 
          immersiveScreen={{top:false, bottom:true}} 
          navbarInset={true}
          additionalPadding={{top: 12, bottom: buttonBottomPadding > 0 ? buttonBottomPadding : 4}}
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
        <View 
          onLayout={handleButtonLayout}
          style={[styles.button, styles.shadowButton, {bottom: insets.bottom + 100}]}
        >
          <IconButton 
            onPress={handleCreatePostPress}
          >
            <AddIcon width={32} height={32} />
          </IconButton>
        </View>
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
  button: {
    width: 64,
    height: 64,
    position: 'absolute',
    right: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.primary,
  },
  shadowButton: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2, 
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3, 
  },
});