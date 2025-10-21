import { axiosPrivate } from './api';
import { HomeFeedItem } from '@/types';

export interface TopicJoinResponse {
  status: number;
  data: any;
}

export interface TopicCreateResponse {
  status: number;
  data: any;
}

export class TopicService {
  static async fetchUserTopics(page: number = 1): Promise<{
    results: HomeFeedItem[];
    count: number;
    next: string | null;
    previous: string | null;
  }> {
    try {
      const response = await axiosPrivate.get(`/users/me/topics/?page=${page}`);
      console.log('Fetched user topics:', response.data);
      
      if (response.status === 200) {
        return response.data;
      }
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
      };
    } catch (error) {
      console.error('Error fetching user topics:', error);
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
      };
    }
  }

  static async joinTopic(code: string): Promise<TopicJoinResponse | null> {
    try {
      const response = await axiosPrivate.post('/users/me/topics/join/', {
        code: code.toUpperCase()
      });
      
      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      console.error('Error joining topic:', error);
      return null;
    }
  }

  static async createTopic(data: {
    title: string;
    description: string;
    topicImageUrl?: any;
  }): Promise<TopicCreateResponse | null> {
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
    } catch (error) {
      console.error('Error creating topic:', error);
      return null;
    }
  }
}