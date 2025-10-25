import React from "react";
import { Stack } from "expo-router";

export default function TopicsLayout() {
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[topicId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};