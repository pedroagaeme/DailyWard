import { createContext, useContext, useEffect, useState } from "react";
import { RegisterFormData, LoginFormData, UserProfile, AuthProps } from "@/types";
import { AuthService } from "@/services/authService";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {return useContext(AuthContext)};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authState, setAuthState] = useState<{
        token: string | null, 
        isAuthenticated: boolean | null
    }>({
        token: null, 
        isAuthenticated: null,
    });

    useEffect(() => {
        const loadAuth = async () => {
            const authState = await AuthService.loadAuthState();
            setAuthState(authState);
        }
        loadAuth();
    }, []);

    const register = async (data: RegisterFormData) => {
        return await AuthService.register(data);
    };

    const login = async (data: LoginFormData) => {
        const result = await AuthService.login(data);
        
        if ('error' in result) {
            return result;
        }

        const { accessToken } = result.data;

        setAuthState({
            token: accessToken,
            isAuthenticated: true,
        });

        return result;
    };

    const logout = async () => {
        await AuthService.logout();
        setAuthState({token: null, isAuthenticated: false});
    }

    const value = {
        authState,
        onRegister: register,
        onLogin: login,
        onLogout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
