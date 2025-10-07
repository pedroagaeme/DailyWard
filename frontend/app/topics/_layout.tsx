import { DailyWardLogoCompact } from '@/assets/images/dailyward-logo-compact';
import { HomeFeedItem } from '@/components/FeedArea/HomeFeedItem';
import { LogoutButton } from '@/components/LogoutButton';
import { Colors } from '@/constants/Colors';
import { axiosPrivate } from '@/utils/api';
import { TopicsProvider, useTopics } from '@/utils/topicsContext';
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { topics, topicState, enterTopic, exitTopic } = useTopics();
  const selectedItem = topicState?.id;

  useEffect(() => {
    const currentRoute = props.state.routes[props.state.index];
    if(currentRoute.name === 'index' && selectedItem) {
      exitTopic!();
    }
  }, [props.state.index]);

  return (
    <DrawerContentScrollView {...props} style={{backgroundColor: Colors.light.background[95], marginBottom: 8 }}>
      <View style={{ padding: 16, gap: 16}}>
        <LogoutButton />
        <Text style={{ fontWeight: 'bold', fontSize: 18, color: Colors.light.text[5] }}>Bem-vindo(a)!</Text>
      </View>
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
      <View style={{padding: 16}}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: Colors.light.text[5] }}>Seus Tópicos</Text>
      </View>
      {topics?.map((topic: HomeFeedItem) => (
        <DrawerItem
          key={topic.id}
          focused={ String(selectedItem) === String(topic.id) }
          label={topic.title}
          labelStyle={{ 
            color: String(selectedItem) === String(topic.id) ? Colors.light.primary : Colors.light.text[30], 
            fontFamily: 'Inter_500Medium', 
            fontSize: 16 }}
          onPress={() => {
            enterTopic!(topic.id, topic.title, topic.createdAt);
          }}
        />
      ))}
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  const [topics, setTopics] = useState<HomeFeedItem[]>([]);
    
    useEffect(() => {
        const fetchUserTopics = async () => {
        try {
            const response = await axiosPrivate.get(`/users/me/topics/`);
            if (response.status === 200) {
            setTopics(response.data.results);
            }
        } catch (error) {
            console.error('Error fetching user topics:', error);
        }
        };
        fetchUserTopics();
    }, []);

  return (
    <TopicsProvider topics={topics}>
      <DrawerLayout />
    </TopicsProvider>
  );
}

export const DrawerLayout = () => {
  const { topicState } = useTopics();
  const selectedItemTitle = topicState?.title;
  return (
    <Drawer
        screenOptions={{
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#fff" },
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
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <DailyWardLogoCompact width={32} height={32} />
                <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 20, color: Colors.light.primary, letterSpacing: -0.2 }}>
                  DailyWard
                </Text>
              </View>
            ),
            headerRight: () => (
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.light.background[90], marginRight: 16 }} />
            ),
          }} 
        />
        <Drawer.Screen
          name="[id]"
          options={({ route }: { route: any }) => {
            const label = selectedItemTitle || 'Topic';
            return {
              drawerLabel: label,
              title: label,
            };
          }}
        />
      </Drawer>
  );
}