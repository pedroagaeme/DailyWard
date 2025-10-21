import { axiosPrivate } from './api';
import { TopicFeedItem } from '@/types';

export interface PostCreateResponse {
  status: number;
  data: any;
}

export interface PostFetchResponse {
  status: number;
  data: TopicFeedItem[];
}

export class PostService {
  static async createPost(topicId: string, data: {
    contentText: string;
    contentPicUrl?: string;
  }): Promise<PostCreateResponse | null> {
    try {
      const formData = new FormData();
      formData.append('contentText', data.contentText);
      
      if (data.contentPicUrl) {
        formData.append('contentPicUrl', {
          uri: data.contentPicUrl,
          name: data.contentPicUrl.split('/').pop() || 'post_image.jpg',
          type: 'image/jpeg',
        } as any);
      }

      const response = await axiosPrivate.post(
        `/users/me/topics/${topicId}/posts/`, 
        formData, 
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating post:', error);
      return null;
    }
  }

  static async fetchPosts(topicId: string, date: string, timezone?: string, page: number = 1): Promise<{
    results: TopicFeedItem[];
    count: number;
    next: string | null;
    previous: string | null;
  }> {
    try {
      const headers: Record<string, string> = {};
      if (timezone) {
        headers['X-User-Timezone'] = timezone;
      }

      const response = await axiosPrivate.get(
        `/users/me/topics/${topicId}/posts/${date}/?page=${page}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
      };
    }
  }

  static async fetchPostById(topicId: string, postId: string): Promise<TopicFeedItem | null> {
    try {
      const response = await axiosPrivate.get(`/users/me/topics/${topicId}/posts/${postId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  }
}
