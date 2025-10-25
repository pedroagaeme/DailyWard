import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

interface ResourcesHeaderProps {
  title: string;
}

export const ResourcesHeader = ({ title }: ResourcesHeaderProps) => {
  const { top: topPadding } = useSafeAreaInsets();
  const navigation = useNavigation();

  const openDrawer = () => {
      navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[styles.header, { paddingTop: topPadding + 12, paddingBottom: 12 }]}>
      <Pressable onPress={() => openDrawer()} style={styles.drawerButton}>
        <Ionicons name="menu" size={24} color={Colors.light.text[5]} />
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.sectionText}>Recursos</Text>
      </View>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  drawerButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 2,
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  titleText: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    color: Colors.light.text[5],
    textAlign: 'center',
  },
  sectionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.light.text[30],
    textAlign: 'center',
    marginTop: 2,
  },
});
