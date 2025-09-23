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
import { AuthProvider, useAuth} from '../utils/AuthContext';

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
        <AppContent />
      </AuthProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function AppContent() {
  const { authState } = useAuth();
  return (
    <Stack initialRouteName="(auth)/index" screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!authState?.isAuthenticated}>
        <Stack.Screen name="(main)/home" options={{ headerShown: false }} />
        <Stack.Screen name="(main)/topic" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!authState?.isAuthenticated}>
        <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}