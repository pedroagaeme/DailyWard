import { axiosPrivate } from './api';
import { UserProfile, UserProfileUpdateData } from '@/types';

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
      formData.append('profile_pic_url', {
        uri: data.profilePicUrl,
        name: data.profilePicUrl.split('/').pop() || 'profile_pic.jpg',
        type: 'image/jpeg',
      } as any);
    }

    const response = await axiosPrivate.patch('/users/me/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.data;
  }
}