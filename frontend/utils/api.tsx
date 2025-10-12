import axios from 'axios';
const BASE_API_URL = 'https://dailyward.app/api/v1';
import { getAccessToken, getRefreshToken, storeTokens } from './tokens';


export const axiosPublic = axios.create({
    baseURL: `${BASE_API_URL}`,
});

export const axiosPrivate = axios.create({
    baseURL: `${BASE_API_URL}`,
});

const refreshToken = async () => {
    const refreshTokenFromStorage = await getRefreshToken();
    if (!refreshTokenFromStorage) {
        return null;
    }

    try {
        const response = await axiosPrivate.post('/auth/token-refresh/', {
            refresh: refreshTokenFromStorage,
        });
        return response.data;
    }
    catch (error) {
        throw new Error('Failed to refresh token');
    }
}

axiosPrivate.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    
    return config;
});

axiosPrivate.interceptors.response.use(
    response => response, 
    async error => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const { access: newAccessToken, refresh: newRefreshToken } = await refreshToken();
            if (newAccessToken && newRefreshToken) {
                axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                await storeTokens(newAccessToken, newRefreshToken);
                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                }
                return axiosPrivate(originalRequest);
            }
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});
