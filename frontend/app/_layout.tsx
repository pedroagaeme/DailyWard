import { useColorScheme } from '@/hooks/useColorScheme';
import { RegisterFormProvider } from '@/utils/registerFormContext';
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
import { AuthProvider, useAuth } from '../utils/authContext';
import { TopicsProvider } from '@/utils/topicsContext';
import {NavigationBar} from '@zoontek/react-native-navigation-bar';

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