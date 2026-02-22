import { useQuery } from '@tanstack/react-query';
import { TopicService } from '@/services/topicService';
import { HomeFeedItem } from '@/types';

interface UseTopicsParams {
  enabled?: boolean;
}

export function useTopics({ 
  enabled = true,
}: UseTopicsParams = {}) {
  return useQuery<HomeFeedItem[]>({
    queryKey: ['topics'],
    queryFn: async () => {
      const response = await TopicService.fetchUserTopics();
      return response;
    },
    enabled,
    staleTime: 0,
    gcTime: 0,
  });
}
