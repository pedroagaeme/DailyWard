import { useInfiniteQuery } from '@tanstack/react-query';
import { TopicService } from '@/services';
import { HomeFeedItem } from '@/types';

interface UseInfiniteTopicsParams {
  enabled?: boolean;
}

interface TopicsPage {
  data: HomeFeedItem[];
  nextCursor?: number;
  hasNextPage: boolean;
}

export function useInfiniteTopics({ enabled = true }: UseInfiniteTopicsParams = {}) {
  return useInfiniteQuery<TopicsPage>({
    queryKey: ['topics'],
    queryFn: async ({ pageParam = 0 }) => {
      // For now, we'll fetch all topics since the API doesn't support pagination
      // In the future, you can modify this to support pagination with pageParam
      const topics = await TopicService.fetchUserTopics();
      return {
        data: topics,
        nextCursor: topics.length > 0 ? pageParam + 1 : undefined,
        hasNextPage: false, // Set to true when pagination is implemented
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}
