import { axiosPrivate } from './api';
import { ParticipantsFeedItem } from '@/types';

export interface ParticipantFetchResponse {
  status: number;
  data: ParticipantsFeedItem[];
}

export class ParticipantService {
  static async fetchParticipants(topicId: string, page: number = 1): Promise<{
    results: ParticipantsFeedItem[];
    count: number;
    next: string | null;
    previous: string | null;
  }> {
    try {
      const response = await axiosPrivate.get(`/users/me/topics/${topicId}/participants/?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching participants:', error);
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
      };
    }
  }
}
