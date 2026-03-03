import { axiosPrivate } from './api';
import { HomeFeedItem } from '@/types';

export interface TopicJoinResponse {
  status: number;
  data: any;
  error?: string;
}

export interface TopicCreateResponse {
  status: number;
  data: any;
  error?: string;
}

export interface TopicGetResponse {
  status: number;
  data: any;
  error?: string;
}

export class TopicService {
  static async fetchUserTopics(): Promise<HomeFeedItem[]> {
    try {
      const response = await axiosPrivate.get(`/users/me/topics/`);
      console.log('Fetched user topics:', response.data);
      
      if (response.status === 200) {
        return Array.isArray(response.data) ? response.data : [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching user topics:', error);
      return [];
    }
  }

  static async joinTopic(code: string): Promise<TopicJoinResponse> {
    try {
      const response = await axiosPrivate.post('/users/me/topics/join/', {
        code: code.toUpperCase()
      });
      
      return {
        status: response.status,
        data: response.data
      };
    } catch (error: any) {
      console.error('Error joining topic:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Ocorreu um erro inesperado';
      return {
        status: error.response?.status || 500,
        data: null,
        error: errorMessage
      };
    }
  }

  static async createTopic(data: {
    title: string;
    description: string;
    topicImageUrl?: any;
  }): Promise<TopicCreateResponse> {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      
      if (data.topicImageUrl) {
        formData.append('topicImageUrl', {
          uri: data.topicImageUrl.uri,
          name: data.topicImageUrl.name || 'topic_image.jpg',
          type: data.topicImageUrl.type || 'image/jpeg',
        } as any);
      }

      const response = await axiosPrivate.post('/users/me/topics/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        status: response.status,
        data: response.data
      };
    } catch (error: any) {
      console.error('Error creating topic:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Ocorreu um erro inesperado';
      return {
        status: error.response?.status || 500,
        data: null,
        error: errorMessage
      };
    }
  }

  static async getTopic(id: string): Promise<TopicGetResponse> {
    try {
      const response = await axiosPrivate.get(`/users/me/topics/${id}/`);
      return {
        status: response.status,
        data: response.data
      };
    } catch (error: any) {
      console.error('Error getting topic:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Ocorreu um erro inesperado';
      return {
        status: error.response?.status || 500,
        data: null,
        error: errorMessage
      };
    }
  }

  static async updateTopic(topicId: string, data: {
    title: string;
    description: string;
    topicImageUrl?: string | null;
  }): Promise<TopicCreateResponse> {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      
      if (data.topicImageUrl && data.topicImageUrl.startsWith('file://')) {
        formData.append('topicImageUrl', {
          uri: data.topicImageUrl,
          name: data.topicImageUrl.split('/').pop() || 'topic_image.jpg',
          type: 'image/jpeg',
        } as any);
      } else if (data.topicImageUrl === null) {
        formData.append('topicImageUrl', '');
      }

      console.log('Updating topic with data:', formData)
      const response = await axiosPrivate.put(`/users/me/topics/${topicId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        status: response.status,
        data: response.data
      };
    } catch (error: any) {
      console.error('Error updating topic:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Ocorreu um erro inesperado';
      return {
        status: error.response?.status || 500,
        data: null,
        error: errorMessage
      };
    }
  }

  static async leaveTopic(topicId: string): Promise<{ status: number; error?: string }> {
    try {
      const response = await axiosPrivate.delete(`/users/me/topics/${topicId}/leave/`);
      return {
        status: response.status
      };
    } catch (error: any) {
      console.error('Error leaving topic:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Ocorreu um erro inesperado';
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      return {
        status: error.response?.status || 500,
        error: errorMessage
      };
    }
  }
}