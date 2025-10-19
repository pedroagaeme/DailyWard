import { useInfiniteQuery } from '@tanstack/react-query';
import { PostService } from '@/services';
import { TopicFeedItem } from '@/types';

interface UseInfinitePostsParams {
  topicId: string;
  date: string;
  timezone?: string;
  enabled?: boolean;
}

interface PostsPage {
  data: TopicFeedItem[];
  nextCursor?: number;
  hasNextPage: boolean;
}

export function useInfinitePosts({ topicId, date, timezone, enabled = true }: UseInfinitePostsParams) {
  return useInfiniteQuery<PostsPage>({
    queryKey: ['posts', topicId, date, timezone],
    queryFn: async ({ pageParam = 0 }) => {
      // For now, we'll fetch all posts for the date since the API doesn't support pagination
      // In the future, you can modify this to support pagination with pageParam
      const posts = await PostService.fetchPosts(topicId, date, timezone);
      return {
        data: posts,
        nextCursor: posts.length > 0 ? pageParam + 1 : undefined,
        hasNextPage: false, // Set to true when pagination is implemented
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: enabled && !!topicId && !!date,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
}
