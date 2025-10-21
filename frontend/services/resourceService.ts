import { axiosPrivate } from './api';
import { ResourcesFeedItem } from '@/types';

export interface ResourceCreateResponse {
  status: number;
  data: any;
}

export interface ResourceFetchResponse {
  status: number;
  data: ResourcesFeedItem[];
}

export class ResourceService {
  static async createResource(topicId: string, data: {
    title: string;
    description: string;
    resourceType: 'file' | 'announcement';
    files?: any[];
  }): Promise<ResourceCreateResponse | null> {
    try {
      const form = new FormData();
      form.append('title', data.title);
      form.append('description', data.description);
      form.append('resourceType', data.resourceType);
      
      if (data.files && data.files.length > 0) {
        data.files.forEach((file) => {
          form.append('files', {
            uri: file.uri,
            name: file.name,
            type: file.mimeType,
          } as any);
        });
      }
      
      const response = await axiosPrivate.post(
        `/users/me/topics/${topicId}/resources/`, 
        form, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      console.error('Error creating resource:', error);
      return null;
    }
  }

  static async fetchResources(topicId: string, page: number = 1): Promise<{
    results: ResourcesFeedItem[];
    count: number;
    next: string | null;
    previous: string | null;
  }> {
    try {
      const response = await axiosPrivate.get(`/users/me/topics/${topicId}/resources/?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resources:', error);
      return {
        results: [],
        count: 0,
        next: null,
        previous: null,
      };
    }
  }

  static async fetchResourceById(topicId: string, resourceId: string): Promise<ResourcesFeedItem | null> {
    try {
      const response = await axiosPrivate.get(`/users/me/topics/${topicId}/resources/${resourceId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching resource:', error);
      return null;
    }
  }
}
