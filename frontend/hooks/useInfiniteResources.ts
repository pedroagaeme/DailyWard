import { useInfiniteQuery } from '@tanstack/react-query';
import { ResourceService } from '@/services/resourceService';
import { ResourcesFeedItem } from '@/types';

interface UseInfiniteResourcesParams {
  topicId: string;
  enabled?: boolean;
}

interface ResourcesPage {
  results: ResourcesFeedItem[];
  count: number;
  next: string | null;
  previous: string | null;
}

export function useInfiniteResources({ 
  topicId, 
  enabled = true 
}: UseInfiniteResourcesParams) {
  return useInfiniteQuery<ResourcesPage>({
    queryKey: ['resources', topicId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await ResourceService.fetchResources(topicId, pageParam as number);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      // If there's a next page, return the next page number
      return lastPage.next ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: enabled && !!topicId,
    staleTime: 0,
    gcTime: 0,
  });
}
