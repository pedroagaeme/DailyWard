import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { RegisterFormData, LoginFormData } from "@/constants/FormTypes";
import { UserProfile } from "./profile";
import { axiosPublic } from "./api";

interface AuthProps {
    profile?: UserProfile | null;
    authState?: {token: string | null, isAuthenticated: boolean | null};
    onRegister?: (data: RegisterFormData) => Promise<any>;
    onLogin?: (data: LoginFormData) => Promise<any>;
    onLogout?: () => Promise<void>;
}

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {return useContext(AuthContext)};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<{
        token: string | null, 
        isAuthenticated: boolean | null
        profile?: UserProfile | null
    }>({
        token: null, 
        isAuthenticated: null,
        profile: null
    });

    useEffect(() => {
        const loadAuth = async () => {
            const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
            const profileData = await SecureStore.getItemAsync('userProfile');
            const profile = profileData ? JSON.parse(profileData) : null;
            if (token && profile) {
                setAuthState({token: token, isAuthenticated: true, profile: profile});
            }
        }
        loadAuth();
    }, []);

    const register = async (data: RegisterFormData) => {
        try {
            console.log(data)
            await axiosPublic.post(`/auth/register/`, data);
        }
        catch (error) {
           return {error: error};
        };
    };

    const login = async (data: LoginFormData) => {
        try {

            const response = await axiosPublic.post(
                `/auth/login/`, 
                data
            );

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

            setAuthState({
                token: accessToken,
                isAuthenticated: true,
                profile: profile
            });

            console.log('Login successful, token stored.');
            return response;
        }
        catch (error) {
            return {error: error};
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        await SecureStore.deleteItemAsync('userProfile');
        setAuthState({token: null, isAuthenticated: false, profile: null});
    }

    const value = {
        authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
