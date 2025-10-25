import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import { useRouter } from 'expo-router';

interface SeePostHeaderProps {
  title: string;
}

export const SeePostHeader = ({ title }: SeePostHeaderProps) => {
  const router = useRouter();
  const { top: topPadding } = useSafeAreaInsets();

  const goBack = () => {
    router.back();
  };

  return (
    <View style={[styles.header, { paddingTop: topPadding + 12, paddingBottom: 12 }]}>
      <Pressable onPress={goBack} style={styles.backButton}>
        <GoBackIcon width={24} height={24} color={Colors.light.text[5]} />
      </Pressable>
      
      <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: Colors.light.background[100],
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    flex: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: Colors.light.text[5],
    textAlign: 'center',
    marginHorizontal: 16,
  },
  placeholder: {
    width: 32,
    height: 32,
  },
});
