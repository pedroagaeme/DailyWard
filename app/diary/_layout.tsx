import { ContactsIcon } from '@/assets/images/tab-icons/contacts-icon';
import { HomeIcon } from '@/assets/images/tab-icons/home-icon';
import { ResourcesIcon } from '@/assets/images/tab-icons/resources-icon';
import { CustomTabButton } from '@/components/CustomTabButton';
import { Colors } from '@/constants/Colors';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <Tabs>
      <TabSlot />
      <TabList style={[styles.navbar, styles.shadowNavbar]}>
        <TabTrigger name="home" href="/" asChild>
          <CustomTabButton Icon={HomeIcon}>
             Início
          </CustomTabButton>
        </TabTrigger>
        <TabTrigger name="search" href="/Diary/resources"  asChild>
          <CustomTabButton Icon={ResourcesIcon}>
            Recursos
          </CustomTabButton>
        </TabTrigger>
        <TabTrigger name="settings" href="/Diary/contacts" asChild>
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
    bottom:50,
    position: "absolute",
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