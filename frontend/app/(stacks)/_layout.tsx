import React from "react";
import { Stack, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useAuth } from "@/contexts/authContext";

const StacksLayout = () => {
    const { authState } = useAuth();
    const nav = useNavigation();
    return (
        <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!authState?.isAuthenticated}>
            <Stack.Screen
                options={{
                headerShown: false,
                }}
                name="topics"
            />
        </Stack.Protected>
        <Stack.Protected guard={!authState?.isAuthenticated}>
            <Stack.Screen
                options={{
                headerShown: false,
                }}
                name="index"
            />
        </Stack.Protected>
        </Stack>
    );
};

export default StacksLayout;