import { DailyWardLogoCompact } from '@/assets/images/dailyward-logo-compact';
import { HomeFeedItem } from '@/types';
import { LogoutButton } from '@/components/LogoutButton';
import { Colors } from '@/constants/Colors';
import { useTopics } from '@/contexts';
import { DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer';
import { SectionList } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomProfileImage } from '@/components/CustomImage';
import { useAuth } from '@/contexts';
import { useInfiniteTopics } from '@/hooks/useInfiniteTopics';
import { ActivityIndicator } from 'react-native';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { topicState, enterTopic, exitTopic } = useTopics();
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteTopics({ enabled: true });
  const topics = useMemo(() => data?.pages.flatMap((page: any) => page.results) || [], [data]);
  const selectedItem = topicState?.id;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const currentRoute = props.state.routes[props.state.index];
    if(currentRoute.name === 'index' && selectedItem) {
      exitTopic!();
    }
  }, [props.state.index]);

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
            focused={!selectedItem}
            onPress={() => exitTopic!()}
            labelStyle = {{ 
              color: !selectedItem ? Colors.light.primary : Colors.light.text[30],
              fontFamily: 'Inter_500Medium', 
              fontSize: 16 
            }}
          />
        );
      case 'topics':
        return (
          <DrawerItem
            key={item.id}
            focused={ String(selectedItem) === String(item.id) }
            label={item.title}
            labelStyle={{ 
              color: String(selectedItem) === String(item.id) ? Colors.light.primary : Colors.light.text[30], 
              fontFamily: 'Inter_500Medium', 
              fontSize: 16 }}
            onPress={() => {
              enterTopic!(item.code, item.id, item.title, item.createdAt);
            }}
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

export default function Layout() {
  return (
    <DrawerLayout />
  );
}

export const DrawerLayout = () => {
  const { authState } = useAuth();
  const { topicState } = useTopics();
  const selectedItemTitle = topicState?.title;
  
  return (
    <Drawer
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: 'Inter_600SemiBold', fontSize: 20, color: "#1E293B" },
          headerTintColor: "#1E293B",
        }}
        drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props}/>}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Tópicos',
            title: 'Tópicos',
            headerStyle: { backgroundColor: Colors.light.background[90]},
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <DailyWardLogoCompact width={32} height={32} />
                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20, color: Colors.light.primary, letterSpacing: -0.2 }}>
                  DailyWard
                </Text>
              </View>
            ),
            headerRight: () => (
              <View style={{marginRight: 16 }}>
                <CustomProfileImage source={null} fullName={authState?.profile?.name || 'Usuário'} style={{width: 36, borderRadius: 18, backgroundColor: Colors.light.background[80]  }}/>
              </View>
            ),
          }} 
        />
        <Drawer.Screen
          name="[id]"
          options={
            ({ route }: { route: any }) => {
            const label = selectedItemTitle || 'Topic';
            return {
              headerStyle: { backgroundColor: Colors.light.background[100]},
              drawerLabel: label,
              title: label,
            };
          }}
        />
      </Drawer>
  );
}