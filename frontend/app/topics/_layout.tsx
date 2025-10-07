import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import { HomeFeedItem } from '@/components/FeedArea/HomeFeedItem';
import { TopicsProvider, useTopics } from '@/utils/topicsContext';
import { LogoutButton } from '@/components/LogoutButton';
import { axiosPrivate } from '@/utils/api';
import { use, useEffect, useState } from 'react';

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
    <DrawerContentScrollView {...props} style={{backgroundColor: '#f0f0f0', marginBottom: 8 }}>
      <View style={{ padding: 16, gap: 16}}>
        <LogoutButton />
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Bem-vindo(a)!</Text>
      </View>
      <DrawerItem 
        label="Início"
        focused={!selectedItem}
        onPress={() => exitTopic!()}
        labelStyle = {{ 
          color: !selectedItem ? '#1976d2' : '#475569',
          fontFamily: 'Inter_500Medium', 
          fontSize: 16 
        }}
      />
      <View style={{padding: 16}}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333333' }}>Seus Tópicos</Text>
      </View>
      {topics?.map((topic: HomeFeedItem) => (
        <DrawerItem
          key={topic.id}
          focused={ String(selectedItem) === String(topic.id) }
          label={topic.title}
          labelStyle={{ 
            color: String(selectedItem) === String(topic.id) ? '#1976d2' : '#475569', 
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
            title: '',
          }} 
        />
        <Drawer.Screen
          name="[id]"
          options={({ route }: { route: any }) => {
            const label = selectedItemTitle|| 'Topic';
            return {
              drawerLabel: label,
              title: label,
            };
          }}
        />
      </Drawer>
  );
}