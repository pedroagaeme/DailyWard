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
  name: string | null;
  email: string | null;
  avatarUrl?: string | null;
}

// Auth context interface
export interface AuthProps {
  authState?: {token: string | null, isAuthenticated: boolean | null, profile?: UserProfile | null};
  onRegister?: (data: RegisterFormData) => Promise<any>;
  onLogin?: (data: LoginFormData) => Promise<any>;
  onLogout?: () => Promise<void>;
}
