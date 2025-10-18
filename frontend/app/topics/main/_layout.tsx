import { DailyWardLogoCompact } from '@/assets/images/dailyward-logo-compact';
import { HomeFeedItem } from '@/components/FeedArea/HomeFeedItem';
import { LogoutButton } from '@/components/LogoutButton';
import { Colors } from '@/constants/Colors';
import { useTopics } from '@/utils/topicsContext';
import { DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer';
import { ScrollView } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DefaultProfileIcon } from '@/components/Image/DefaultProfileIcon';
import { CustomProfileImage } from '@/components/Image/ImageComponent';
import { useAuth } from '@/utils/authContext';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { topics, topicState, enterTopic, exitTopic } = useTopics();
  const selectedItem = topicState?.id;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const currentRoute = props.state.routes[props.state.index];
    if(currentRoute.name === 'index' && selectedItem) {
      exitTopic!();
    }
  }, [props.state.index]);

  return (
    <View style={{flex: 1, backgroundColor: Colors.light.background[95]}}>
      <ScrollView 
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 8}}
        showsVerticalScrollIndicator={false}
        bounces={true}
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={false}
        >
        
        <View style={{ padding: 8, gap: 4, paddingTop: insets.top, paddingBottom: insets.bottom}}>
          <View style={{ padding: 12, gap: 12}}>
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
          <View style={{padding: 12}}>
            <Text style={{ fontFamily: 'Inter_700Bold', fontSize: 16, color: Colors.light.text[5] }}>Seus Tópicos</Text>
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
                enterTopic!(topic.code, topic.id, topic.title, topic.createdAt);
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default function Layout() {
  const {fetchUserTopics } = useTopics();
  
  useEffect(() => {
    fetchUserTopics!();
  }, []);

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