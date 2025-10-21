import { axiosPublic } from './api';
import { RegisterFormData, LoginFormData, UserProfile } from '@/types';
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export interface AuthResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    email: string;
    fullName: string;
  };
}

export interface AuthError {
  error: any;
}

export class AuthService {
  static async register(data: RegisterFormData): Promise<AuthError | void> {
    try {
      console.log(data);
      await axiosPublic.post('/auth/register/', data);
    } catch (error) {
      return { error: error };
    }
  }

  static async login(data: LoginFormData): Promise<AuthResponse | AuthError> {
    try {
      const response = await axiosPublic.post('/auth/login/', data);
      
      const accessToken = response.data.data.accessToken;
      const refreshToken = response.data.data.refreshToken;
      
      await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
      await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);

      const email = response.data.data.email;
      const fullName = response.data.data.fullName;
      const profile: UserProfile = {
        name: fullName,
        email: email,
        avatarUrl: null
      };

      await SecureStore.setItemAsync('userProfile', JSON.stringify(profile));

      console.log('Login successful, token stored.');
      return response.data;
    } catch (error) {
      return { error: error };
    }
  }

  static async logout(): Promise<void> {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync('userProfile');
  }

  static async loadAuthState(): Promise<{
    token: string | null;
    isAuthenticated: boolean;
    profile: UserProfile | null;
  }> {
    const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
    const profileData = await SecureStore.getItemAsync('userProfile');
    const profile = profileData ? JSON.parse(profileData) : null;
    
    return {
      token: token,
      isAuthenticated: !!(token && profile),
      profile: profile
    };
  }
}
