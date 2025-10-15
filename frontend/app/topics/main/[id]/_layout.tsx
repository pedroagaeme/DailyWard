import { ContactsIcon } from '@/assets/images/tab-icons/contacts-icon';
import { HomeIcon } from '@/assets/images/tab-icons/home-icon';
import { ResourcesIcon } from '@/assets/images/tab-icons/resources-icon';
import { CustomTabButton } from '@/components/CustomTabButton';
import { Colors } from '@/constants/Colors';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { useRouter, useSegments } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AddIcon } from '@/assets/images/add-icon';

export default function Layout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const segments = useSegments();

  // Get the focused tab name from segments
  const focusedTab = segments[segments.length - 1];

  const handleButtonPress = () => {
    console.log(focusedTab);
    router.push("/topics/create-post");
  };

  return (
    <Tabs>
      <TabSlot />
      {(focusedTab === '[id]' || focusedTab === undefined) && (
        <Pressable onPress={handleButtonPress} style={[styles.button, styles.shadowNavbar, {bottom:insets.bottom + 100}]}>
          <AddIcon width={32} height={32}  />
        </Pressable>
      )}
      <TabList style={[styles.navbar, styles.shadowNavbar, {bottom:insets.bottom}]}>
        <TabTrigger name="posts" href="/topics/main/[id]" asChild>
          <CustomTabButton Icon={HomeIcon}>
            Início
          </CustomTabButton>
        </TabTrigger>
        <TabTrigger name="resources" href="/topics/main/[id]/resources"  asChild>
          <CustomTabButton Icon={ResourcesIcon}>
            Recursos
          </CustomTabButton>
        </TabTrigger>
        <TabTrigger name="participants" href="/topics/main/[id]/participants" asChild>
          <CustomTabButton Icon={ContactsIcon}>
            Particip...
          </CustomTabButton>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    alignItems:"center",
    alignSelf: 'center',
    marginHorizontal: 12,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginBottom: 4,
    maxWidth: 260,
    flexDirection:'row',
    justifyContent:'space-around',
    borderRadius:16,
    backgroundColor: Colors.light.primary,
  },
  button: {
    position: 'absolute',
    justifyContent:"center",
    alignItems:"center",
    right:20,
    padding: 16,
    borderRadius: 20,
    backgroundColor: Colors.light.primary,
  },
  shadowNavbar: {
    shadowColor: '#000',
      shadowOffset: {
          width: 0,
          height: 2, 
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 3, 
  },
});