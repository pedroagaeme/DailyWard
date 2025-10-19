import { useColorScheme } from '@/hooks/useColorScheme';
import { RegisterFormProvider } from '@/contexts';
import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    useFonts
} from '@expo-google-fonts/inter';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../contexts';
import { TopicsProvider } from '@/contexts';
import {NavigationBar} from '@zoontek/react-native-navigation-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold, 
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
    
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  
  return (
    <>
    <NavigationBar barStyle='dark-content'/>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <RegisterFormProvider>
            <TopicsProvider>
              <AppContent />
            </TopicsProvider>
          </RegisterFormProvider>
        </AuthProvider>
        <StatusBar style="dark" />
      </ThemeProvider>
    </QueryClientProvider>
    </>
  );
}

function AppContent() {
  const { authState } = useAuth();
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
      <Stack.Protected guard={!!authState?.isAuthenticated}>
        <Stack.Screen name="topics/main" options={{ headerShown: false }} />
        <Stack.Screen name="topics/create-post" options={{ headerShown: false }} />
        <Stack.Screen name="topics/create-topic" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!authState?.isAuthenticated}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register/index" options={{ headerShown: false }} />
        <Stack.Screen name="register/password-form" options={{ headerShown: false }} />
        <Stack.Screen name="register/email-form" options={{ headerShown: false }} />
        <Stack.Screen name="register/verify-email" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}