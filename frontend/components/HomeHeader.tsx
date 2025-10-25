import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { DailyWardLogoCompact } from '@/assets/images/dailyward-logo-compact';
import { CustomProfileImage } from '@/components/CustomImage';
import { useAuth } from '@/contexts';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const HomeHeader = () => {
  const navigation = useNavigation();
  const { top: topPadding } = useSafeAreaInsets();
  const { authState } = useAuth();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[styles.header, { paddingTop: topPadding + 12, paddingBottom: 12 }]}>
      <Pressable onPress={openDrawer} style={styles.drawerButton}>
        <Ionicons name="menu" size={24} color={Colors.light.text[5]} />
      </Pressable>
      
      <View style={styles.logoContainer}>
        <DailyWardLogoCompact width={32} height={32} />
        <Text style={styles.logoText}>DailyWard</Text>
      </View>
      
      <CustomProfileImage
        source={authState?.profile?.avatarUrl || null}
        fullName={authState?.profile?.name || 'User'}
        style={styles.profilePic}
        containerStyle={styles.profileContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    paddingLeft: 12,
  },
  drawerButton: {
    padding: 8,
  },
  logoContainer: {
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
    width: 40,
    height: 40,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.background[80],
  },
});
