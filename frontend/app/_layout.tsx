import { useColorScheme } from '@/hooks/useColorScheme';
import { RegisterFormProvider } from '@/contexts';
import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    useFonts
} from '@expo-google-fonts/inter';
import { Href, router, useGlobalSearchParams } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { AuthProvider } from '../contexts';
import {NavigationBar} from '@zoontek/react-native-navigation-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LogoutButton } from '@/components/LogoutButton';
import { SectionList, View, Text } from 'react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useInfiniteTopics } from '@/hooks/useInfiniteTopics';
import { ActivityIndicator } from 'react-native';
import { DrawerContentComponentProps, DrawerItem, useDrawerProgress } from '@react-navigation/drawer';
import { Colors } from '@/constants/Colors';
import {GestureHandlerRootView} from "react-native-gesture-handler";

// Custom Drawer Content Component
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteTopics({ enabled: true });
  const topics = useMemo(() => data?.pages.flatMap((page: any) => page.results) || [], [data]);
  const insets = useSafeAreaInsets();
  const {topicId} = useGlobalSearchParams();
  const selectedItem = topicId as string | undefined;
  const [clickedItem, setClickedItem] = useState<string | undefined>(selectedItem);
  const progress = useDrawerProgress();
  const pendingRoute = useRef<Href | null>(null);

  useEffect(() => {
    if (progress.value > 0.99) {
        setTimeout(() => {
          if (pendingRoute.current) {
            if (pendingRoute.current === '/topics') {
              router.dismissTo(pendingRoute.current);
            }
            if (!selectedItem) {
              router.push(pendingRoute.current);
            }
            else {
              router.replace(pendingRoute.current);
            }
            pendingRoute.current = null;
          }
        }, 300);
      }
  }, [progress, pendingRoute.current]);

  useEffect(() => {
    setClickedItem(selectedItem);
  }, [selectedItem]);

  const handleNavigateAndClose = (href: Href) => {
    pendingRoute.current = href;
    props.navigation.closeDrawer();
  };
  
  // Create sections data for SectionList
  const sections = [
    {
      title: 'header',
      data: [{}], // Empty data array for header section
    },
    {
      title: 'navigation',
      data: [{}], // Empty data array for navigation section
    },
    {
      title: 'topics',
      data: topics,
    }
  ];

  const handleBack = () => {
    if (clickedItem === undefined) {
      props.navigation.closeDrawer();
      return;
    }
    setClickedItem(undefined);
    handleNavigateAndClose('/topics');
  }

  const handleTopicPress = (topicId: string) => {
    if (selectedItem === String(topicId)) {
      props.navigation.closeDrawer();
      return;
    }
    setClickedItem(topicId);
    handleNavigateAndClose({pathname: '/topics/[topicId]', params: {topicId: topicId}});
  }

  const renderItem = ({ item, section }: { item: any, section: any }) => {
    switch (section.title) {
      case 'header':
        return (
          <View style={{ padding: 12, gap: 12, paddingTop: insets.top }}>
            <LogoutButton />
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.light.text[5] }}>Bem-vindo(a)!</Text>
          </View>
        );
      case 'navigation':
        return (
          <DrawerItem
            label="Início"
            focused={clickedItem === undefined}
            onPress={handleBack}
            labelStyle = {{ 
              color: clickedItem === undefined ? Colors.light.primary : Colors.light.text[30],
              fontFamily: 'Inter_500Medium', 
              fontSize: 16 
            }}
          />
        );
      case 'topics':
        return (
          <DrawerItem
            key={item.id}
            focused={ String(clickedItem) === String(item.id) }
            label={item.title}
            labelStyle={{ 
              color: String(clickedItem) === String(item.id) ? Colors.light.primary : Colors.light.text[30], 
              fontFamily: 'Inter_500Medium', 
              fontSize: 16 }}
            onPress={() => handleTopicPress(item.id)}
          />
        );
      default:
        return null;
    }
  };

  const renderSectionHeader = ({ section }: { section: any }) => {
    if (section.title === 'topics') {
      return (
        <View style={{padding: 12}}>
          <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 16, color: Colors.light.text[5] }}>Seus Tópicos</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.light.background[95]}}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        contentContainerStyle={{paddingBottom: insets.bottom, paddingTop: 12, paddingHorizontal: 8}}
        showsVerticalScrollIndicator={false}
        bounces={true}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        scrollEventThrottle={16}
        onEndReachedThreshold={0.1}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              color="blue"
              size="small"
              style={{ marginBottom: 5 }}
            />
          ) : null
        }
      />
    </View>
  );
}

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
        <AuthProvider>
          <RegisterFormProvider>
                <AppContent />
          </RegisterFormProvider>
        </AuthProvider>
        <StatusBar style="dark" />
    </QueryClientProvider>
    </>
  );
}

function AppContent() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{ headerShown: false }}
          drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props}/>}
        >
          <Drawer.Screen
            name="(stacks)"
          />
      </Drawer>
    </GestureHandlerRootView>
  );
}