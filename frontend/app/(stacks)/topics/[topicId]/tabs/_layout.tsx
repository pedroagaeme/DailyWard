import { ContactsIcon } from '@/assets/images/tab-icons/contacts-icon';
import { HomeIcon } from '@/assets/images/tab-icons/home-icon';
import { ResourcesIcon } from '@/assets/images/tab-icons/resources-icon';
import { CustomTabButton } from '@/components/CustomTabButton';
import { Colors } from '@/constants/Colors';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalSearchParams } from 'expo-router';


export default function Layout() {
  const insets = useSafeAreaInsets();
  const params = useGlobalSearchParams();
  const topicId = params.topicId as string || '';

  return (
    <Tabs>
      <TabSlot />
      <TabList style={[styles.navbar, styles.shadowNavbar, {bottom:insets.bottom}]}>
        <TabTrigger name="posts" href={{pathname: `/`, params: {topicId: topicId}}} asChild>
          <CustomTabButton Icon={HomeIcon}>
            Início
          </CustomTabButton>
        </TabTrigger>
        <TabTrigger name="resources" href='./resources' asChild>
          <CustomTabButton Icon={ResourcesIcon}>
            Recursos
          </CustomTabButton>
        </TabTrigger>
        <TabTrigger name="participants" href='./participants' asChild>
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
    borderRadius:28,
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