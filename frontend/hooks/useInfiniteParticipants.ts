import { useInfiniteQuery } from '@tanstack/react-query';
import { ParticipantService } from '@/services';
import { ParticipantsFeedItem } from '@/types';

interface UseInfiniteParticipantsParams {
  topicId: string;
  enabled?: boolean;
}

interface ParticipantsPage {
  data: ParticipantsFeedItem[];
  nextCursor?: number;
  hasNextPage: boolean;
}

export function useInfiniteParticipants({ topicId, enabled = true }: UseInfiniteParticipantsParams) {
  return useInfiniteQuery<ParticipantsPage>({
    queryKey: ['participants', topicId],
    queryFn: async ({ pageParam = 0 }) => {
      // For now, we'll fetch all participants since the API doesn't support pagination
      // In the future, you can modify this to support pagination with pageParam
      const participants = await ParticipantService.fetchParticipants(topicId);
      return {
        data: participants,
        nextCursor: participants.length > 0 ? pageParam + 1 : undefined,
        hasNextPage: false, // Set to true when pagination is implemented
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: enabled && !!topicId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
}
