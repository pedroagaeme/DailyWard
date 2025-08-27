import { ContactsIcon } from '@/assets/images/tab-icons/contacts-icon';
import { HomeIcon } from '@/assets/images/tab-icons/home-icon';
import { ResourcesIcon } from '@/assets/images/tab-icons/resources-icon';
import { CustomTabButton } from '@/components/CustomTabButton';
import { Colors } from '@/constants/Colors';
import { navbarMaxHeight } from '@/constants/HeightInsets';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Layout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs>
      <TabSlot />
      <TabList style={[styles.navbar, styles.shadowNavbar, {bottom:insets.bottom}]}>
        <TabTrigger name="home" href="/" asChild>
          <CustomTabButton Icon={HomeIcon}>
             Início
          </CustomTabButton>
        </TabTrigger>
        <TabTrigger name="resources" href="/diary/resources"  asChild>
          <CustomTabButton Icon={ResourcesIcon}>
            Recursos
          </CustomTabButton>
        </TabTrigger>
        <TabTrigger name="contacts" href="/diary/contacts" asChild>
          <CustomTabButton Icon={ContactsIcon}>
            Contatos
          </CustomTabButton>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
    navbar: {
    position: "absolute",
    maxHeight:navbarMaxHeight,
		width:300,
    paddingVertical:10,
    paddingHorizontal:20,
    gap:10,
    flexDirection:'row',
    justifyContent:'space-around',
    alignSelf:'center',
    borderRadius:20,
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