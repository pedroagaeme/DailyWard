import { Stack } from "expo-router"

export default function StackLayout() {
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="tabs" />
            
            <Stack.Screen name="posts/create-post" />
            <Stack.Screen name="posts/[postId]" />
            
            <Stack.Screen name="resources/add-resource" />
            <Stack.Screen name="resources/[resourceId]" />
            
        </Stack>
    )
}