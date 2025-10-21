import { useInfiniteQuery } from '@tanstack/react-query';
import { ParticipantService } from '@/services/participantService';
import { ParticipantsFeedItem } from '@/types';

interface UseInfiniteParticipantsParams {
  topicId: string;
  enabled?: boolean;
}

interface ParticipantsPage {
  results: ParticipantsFeedItem[];
  count: number;
  next: string | null;
  previous: string | null;
}

export function useInfiniteParticipants({ 
  topicId, 
  enabled = true 
}: UseInfiniteParticipantsParams) {
  return useInfiniteQuery<ParticipantsPage>({
    queryKey: ['participants', topicId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await ParticipantService.fetchParticipants(topicId, pageParam as number);
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
