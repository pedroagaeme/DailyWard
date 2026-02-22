import { axiosPrivate } from './api';
import { UserProfile, UserProfileUpdateData } from '@/types';
import mime from 'mime';

export class ProfileService {
  static async getProfile(): Promise<UserProfile> {
    const response = await axiosPrivate.get('/users/me/');
    return response.data.data;
  }

  static async updateProfile(data: UserProfileUpdateData): Promise<UserProfile> {
    const formData = new FormData();
    
    if (data.firstName !== undefined) {
      formData.append('first_name', data.firstName);
    }
    if (data.lastName !== undefined) {
      formData.append('last_name', data.lastName);
    }
    if (data.profilePicUrl) {
      // if it is a string (URI), create a file object
      if (typeof data.profilePicUrl === 'string') {
        formData.append('profile_pic_url', {
          uri: data.profilePicUrl,
          name: data.profilePicUrl.split('/').pop() || 'profile_pic.jpg',
          type: mime.getType(data.profilePicUrl) || 'image/jpeg',
        } as any);
      } else {
        // if it is already a file object, use it directly
        formData.append('profile_pic_url', data.profilePicUrl as any);
      }
    }

    const response = await axiosPrivate.patch('/users/me/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.data;
  }
}