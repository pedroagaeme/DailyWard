import { axiosPrivate } from './api';
import { ParticipantsFeedItem } from '@/types';

export interface ParticipantFetchResponse {
  status: number;
  data: ParticipantsFeedItem[];
}

export class ParticipantService {
  static async fetchParticipants(topicId: string): Promise<ParticipantsFeedItem[]> {
    try {
      const response = await axiosPrivate.get(`/users/me/topics/${topicId}/participants/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching participants:', error);
      return [];
    }
  }
}
