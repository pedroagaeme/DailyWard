import * as SecureStore from "expo-secure-store";
import { UserProfile } from "@/types";

export const getProfile = async () => {
    const profile = await SecureStore.getItemAsync('userProfile');
    return profile ? JSON.parse(profile) : null;
};

export const storeProfile = async (profile: UserProfile) => {
    await SecureStore.setItemAsync('userProfile', JSON.stringify(profile));
};

export const clearProfile = async () => {
    await SecureStore.deleteItemAsync('userProfile');
};