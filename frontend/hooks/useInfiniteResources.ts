import { useInfiniteQuery } from '@tanstack/react-query';
import { ResourceService } from '@/services';
import { ResourcesFeedItem } from '@/types';

interface UseInfiniteResourcesParams {
  topicId: string;
  enabled?: boolean;
}

interface ResourcesPage {
  data: ResourcesFeedItem[];
  nextCursor?: number;
  hasNextPage: boolean;
}

export function useInfiniteResources({ topicId, enabled = true }: UseInfiniteResourcesParams) {
  return useInfiniteQuery<ResourcesPage>({
    queryKey: ['resources', topicId],
    queryFn: async ({ pageParam = 0 }) => {
      // For now, we'll fetch all resources since the API doesn't support pagination
      // In the future, you can modify this to support pagination with pageParam
      const resources = await ResourceService.fetchResources(topicId);
      return {
        data: resources,
        nextCursor: resources.length > 0 ? pageParam + 1 : undefined,
        hasNextPage: false, // Set to true when pagination is implemented
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: enabled && !!topicId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}
