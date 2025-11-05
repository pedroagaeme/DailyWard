import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { DailyWardLogoCompact } from '@/assets/images/dailyward-logo-compact';
import { CustomProfileImage } from '@/components/CustomImage';
import { useUserProfile } from '@/hooks';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from '@/components/IconButton';

export const HomeHeader = () => {
  const navigation = useNavigation();
  const { top: topPadding } = useSafeAreaInsets();
  const { profile } = useUserProfile();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[styles.header, { paddingTop: topPadding + 12, paddingBottom: 12 }]}>
      <IconButton 
        style={{marginLeft: 4}}
        onPress={openDrawer} 
        borders={{left: true, top: true}} 
        outerboxRadius={10} 
        innerSize={24} >
        <Ionicons name="menu" size={24} color={Colors.light.text[5]} />
      </IconButton>
      
      <View style={styles.logoContainer}>
        <DailyWardLogoCompact width={32} height={32} />
        <Text style={styles.logoText}>DailyWard</Text>
      </View>
      
      <View style={styles.profileContainer}>
        <CustomProfileImage
          source={profile?.profilePicUrl || null}
          fullName={`${profile?.firstName} ${profile?.lastName}` || 'User'}
          style={styles.profilePic}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    paddingLeft: 16,
  },
  logoContainer: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: Colors.light.primary,
  },
  profileContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 44,
    height: 44,
    borderRadius: 50,
    backgroundColor: Colors.light.background[80],
  },
});
