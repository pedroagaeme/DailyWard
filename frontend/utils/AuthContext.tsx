import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { RegisterFormData, LoginFormData } from "@/constants/FormTypes";

interface AuthProps {
    authState?: {token: string | null, isAuthenticated: boolean | null};
    onRegister?: (data: RegisterFormData) => Promise<any>;
    onLogin?: (data: LoginFormData) => Promise<any>;
    onLogout?: () => Promise<void>;
}

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';
export const API_URL = 'https://dailyward.app/api/v1';

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {return useContext(AuthContext)};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<{
        token: string | null, 
        isAuthenticated: boolean | null
    }>({
        token: null, 
        isAuthenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
            if (token) {
                setAuthState({token, isAuthenticated: true});
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        }
        loadToken();
    }, []);

    const register = async (data: RegisterFormData) => {
        try {
            await axios.post(`${API_URL}/auth/register/`, data);
        }
        catch (error) {
           return {error: error};
        };
    };

    const login = async (data: LoginFormData) => {
        try {

            const response = await axios.post(
                `${API_URL}/auth/login/`, 
                data
            );

            const accessToken = response.data.data.access_token;
            const refreshToken = response.data.data.refresh_token;

            await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
            await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);

            setAuthState({token: accessToken
                , isAuthenticated: true});

            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            console.log('Login successful, token stored.');
            return response;
        }
        catch (error) {
            return {error: error};
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
        setAuthState({token: null, isAuthenticated: false});
        delete axios.defaults.headers.common['Authorization'];

    }

    const value = {
        authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
