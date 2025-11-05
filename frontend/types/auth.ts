// Authentication form data types
export interface LoginFormData {
  email?: string;
  password?: string;
}

export interface RegisterFormData extends LoginFormData {
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
}

// User profile interface
export interface UserProfile {
  id: string | null;
  firstName: string | null;
  lastName: string | null;
  profilePicUrl: string | null;
}

// User profile update data
export interface UserProfileUpdateData {
  firstName?: string;
  lastName?: string;
  profilePicUrl?: any; // File object for React Native
}

// Auth context interface
export interface AuthProps {
  authState?: {token: string | null, isAuthenticated: boolean | null};
  onRegister?: (data: RegisterFormData) => Promise<any>;
  onLogin?: (data: LoginFormData) => Promise<any>;
  onLogout?: () => Promise<void>;
}
