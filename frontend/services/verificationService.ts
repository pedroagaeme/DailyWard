import { axiosPrivate } from './api';

export interface VerificationResponse {
  status: number;
  data: any;
}

export class VerificationService {
  static async verifyEmail(otp: string): Promise<VerificationResponse | null> {
    try {
      const response = await axiosPrivate.post('/auth/verify-email/', {
        otp: otp
      });

      return {
        status: response.status,
        data: response.data
      };
    } catch (error) {
      console.error('Error verifying email:', error);
      return null;
    }
  }
}
