import { axiosPrivate } from './api';
import { ResourcesFeedItem } from '@/types';

export interface ResourceCreateResponse {
  status: number;
  data: any;
  error?: string;
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
  }): Promise<ResourceCreateResponse> {
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
    } catch (error: any) {
      console.error('Error creating resource:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Ocorreu um erro inesperado';
      return {
        status: error.response?.status || 500,
        data: null,
        error: errorMessage
      };
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

  static async updateResource(topicId: string, resourceId: string, data: {
    title: string;
    description: string;
    resourceType: 'file' | 'announcement';
    files?: any[];
    existingFileIds?: number[];
  }): Promise<ResourceCreateResponse> {
    try {
      const form = new FormData();
      form.append('title', data.title);
      form.append('description', data.description);
      form.append('resourceType', data.resourceType);
      
      // Append existing file IDs to keep
      if (data.existingFileIds && data.existingFileIds.length > 0) {
        data.existingFileIds.forEach((id) => {
          form.append('existingFileIds', id.toString());
        });
      }
      
      // Append new files
      if (data.files && data.files.length > 0) {
        data.files.forEach((file) => {
          form.append('files', {
            uri: file.uri,
            name: file.name,
            type: file.mimeType,
          } as any);
        });
      }
      
      const response = await axiosPrivate.put(
        `/users/me/topics/${topicId}/resources/${resourceId}/`, 
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
    } catch (error: any) {
      console.error('Error updating resource:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Ocorreu um erro inesperado';
      return {
        status: error.response?.status || 500,
        data: null,
        error: errorMessage
      };
    }
  }

  static async deleteResource(topicId: string, resourceId: string): Promise<{ status: number; error?: string }> {
    try {
      const response = await axiosPrivate.delete(`/users/me/topics/${topicId}/resources/${resourceId}/`);
      return {
        status: response.status
      };
    } catch (error: any) {
      console.error('Error deleting resource:', error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.message || 'Ocorreu um erro inesperado';
      return {
        status: error.response?.status || 500,
        error: errorMessage
      };
    }
  }
}
