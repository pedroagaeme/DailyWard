import { useInfiniteQuery } from '@tanstack/react-query';
import { TopicService } from '@/services/topicService';
import { HomeFeedItem } from '@/types';

interface UseInfiniteTopicsParams {
  enabled?: boolean;
}

interface TopicsPage {
  results: HomeFeedItem[];
  count: number;
  next: string | null;
  previous: string | null;
}

export function useInfiniteTopics({ 
  enabled = true,
}: UseInfiniteTopicsParams = {}) {
  return useInfiniteQuery<TopicsPage>({
    queryKey: ['topics'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await TopicService.fetchUserTopics(pageParam as number);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      // If there's a next page, return the next page number
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled,
    staleTime: 0,
    gcTime: 0,
  });
}
