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

  static async removeParticipant(topicId: string, participantId: string): Promise<{ status: number } | null> {
    try {
      const response = await axiosPrivate.delete(`/users/me/topics/${topicId}/participants/${participantId}/`);
      return { status: response.status };
    } catch (error: any) {
      console.error('Error removing participant:', error);
      return error.response ? { status: error.response.status } : null;
    }
  }

  static async updateParticipantRole(topicId: string, participantId: string, role: 'admin' | 'member'): Promise<{ status: number } | null> {
    try {
      const response = await axiosPrivate.patch(`/users/me/topics/${topicId}/participants/${participantId}/`, {
        role: role
      });
      return { status: response.status };
    } catch (error: any) {
      console.error('Error updating participant role:', error);
      return error.response ? { status: error.response.status } : null;
    }
  }
}
