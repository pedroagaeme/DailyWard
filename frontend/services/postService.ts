import { axiosPrivate } from './api';
import { TopicFeedItem } from '@/types';

export interface PostCreateResponse {
  status: number;
  data: any;
  error?: string;
}

export interface PostFetchResponse {
  status: number;
  data: TopicFeedItem[];
}

export class PostService {
  static async createPost(topicId: string, data: {
    contentText: string;
    contentPicUrl: string | null;
  }): Promise<PostCreateResponse> {
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
    } catch (error: any) {
      console.error('Error creating post:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Ocorreu um erro inesperado';
      return {
        status: error.response?.status || 500,
        data: null,
        error: errorMessage
      };
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

  static async updatePost(topicId: string, postId: string, data: {
    contentText: string;
    contentPicUrl?: string | null;
  }): Promise<PostCreateResponse> {
    try {
      const formData = new FormData();
      formData.append('contentText', data.contentText);
      
      if (data.contentPicUrl && data.contentPicUrl.startsWith('file://')) {
        formData.append('contentPicUrl', {
          uri: data.contentPicUrl,
          name: data.contentPicUrl.split('/').pop() || 'post_image.jpg',
          type: 'image/jpeg',
        } as any);
      } else if (data.contentPicUrl === null) {
        formData.append('contentPicUrl', '');
      }

      if (!data.contentPicUrl) {
        formData.append('contentPicUrl', '');
      }

      console.log('Updating post with data:', formData)
      const response = await axiosPrivate.put(
        `/users/me/topics/${topicId}/posts/${postId}/`, 
        formData, 
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      return {
        status: response.status,
        data: response.data
      };
    } catch (error: any) {
      console.error('Error updating post:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Ocorreu um erro inesperado';
      return {
        status: error.response?.status || 500,
        data: null,
        error: errorMessage
      };
    }
  }

  static async deletePost(topicId: string, postId: string): Promise<{ status: number; error?: string }> {
    try {
      const response = await axiosPrivate.delete(`/users/me/topics/${topicId}/posts/${postId}/`);
      return {
        status: response.status
      };
    } catch (error: any) {
      console.error('Error deleting post:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Ocorreu um erro inesperado';
      return {
        status: error.response?.status || 500,
        error: errorMessage
      };
    }
  }
}
