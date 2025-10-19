import { createContext, useContext, useEffect, useState } from "react";
import { RegisterFormData, LoginFormData, UserProfile, AuthProps } from "@/types";
import { AuthService } from "@/services";

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

        const { accessToken, refreshToken, email, fullName } = result.data;
        const profile: UserProfile = {
            name: fullName,
            email: email,
            avatarUrl: null
        };

        setAuthState({
            token: accessToken,
            isAuthenticated: true,
            profile: profile
        });

        return result;
    };

    const logout = async () => {
        await AuthService.logout();
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
