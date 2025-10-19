import * as SecureStore from "expo-secure-store";

export const getAccessToken = async () => {
    const token = await SecureStore.getItemAsync('accessToken');
    if (!token) {
        return null;
    }
    return token;
}

export const getRefreshToken = async () => {
    const token = await SecureStore.getItemAsync('refreshToken');
    if (!token) {
        return null;
    }
    return token;
}

export const storeTokens = async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
}

export const clearTokens = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
}
