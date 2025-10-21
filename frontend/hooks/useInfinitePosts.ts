import { useInfiniteQuery } from '@tanstack/react-query';
import { PostService } from '@/services/postService';
import { TopicFeedItem } from '@/types/feed';

export interface PostsPage {
  results: TopicFeedItem[];
  count: number;
  next: string | null;
  previous: string | null;
}

export interface UseInfinitePostsParams {
  topicId: string;
  date: string;
  timezone?: string;
  enabled?: boolean;
}

export function useInfinitePosts({ 
  topicId, 
  date, 
  timezone, 
  enabled = true 
}: UseInfinitePostsParams) {
  return useInfiniteQuery<PostsPage>({
    queryKey: ['posts', topicId, date, timezone],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await PostService.fetchPosts(topicId, date, timezone, pageParam as number);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      // If there's a next page, return the next page number
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: enabled && !!topicId && !!date,
    staleTime: 0,
    gcTime: 0,
  });
}
