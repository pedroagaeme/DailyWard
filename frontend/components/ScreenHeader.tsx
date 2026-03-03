import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import { useRouter } from 'expo-router';
import { IconButton } from '@/components/IconButton';
import { Ionicons } from '@expo/vector-icons';

interface ScreenHeaderProps {
  title: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  showMenuIcon?: boolean;
}

export const ScreenHeader = ({ title, onBackPress, rightComponent, showMenuIcon = false }: ScreenHeaderProps) => {
  const router = useRouter();
  const { top: topPadding } = useSafeAreaInsets();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.header, { paddingTop: topPadding + 12, paddingBottom: 12 }]}>
      <IconButton onPress={handleBackPress} innerSize={28} outerboxRadius={8} borders={{left: true, bottom: true}}>
        {showMenuIcon ? (
          <Ionicons name="menu" size={24} color={Colors.light.text[5]} />
        ) : (
          <GoBackIcon width={28} height={28} color={Colors.light.text[5]} />
        )}
      </IconButton>
      
      <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
        {title}
      </Text>
      
      {rightComponent || <View style={styles.placeholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 4,
  },
  titleText: {
    flex: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 20,
    color: Colors.light.text[5],
    textAlign: 'center',
    marginRight: 36,
    marginLeft: 32,
  },
  placeholder: {
    width: 32,
    height: 32,
  },
});

