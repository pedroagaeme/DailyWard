import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { 
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold, 
  useFonts } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth} from '../utils/authContext';
import { TopicProvider } from '@/utils/topicContext';
import { RegisterFormProvider } from '@/utils/registerFormContext';

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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <TopicProvider>
          <RegisterFormProvider>
            <AppContent />
          </RegisterFormProvider>
        </TopicProvider>
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function AppContent() {
  const { authState } = useAuth();
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!authState?.isAuthenticated}>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="topic" options={{ headerShown: false }} />
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