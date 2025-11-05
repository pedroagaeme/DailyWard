import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { router, useGlobalSearchParams } from 'expo-router';
import { AddIcon } from '@/assets/images/add-icon';
import { IconButton } from '@/components/IconButton';

interface ResourcesHeaderProps {
  title: string;
}

export const ResourcesHeader = ({ title }: ResourcesHeaderProps) => {
  const { top: topPadding } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { topicId } = useGlobalSearchParams();

  const openDrawer = () => {
      navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleAddResource = () => {
    router.push({
      pathname: '/topics/[topicId]/resources/add-resource',
      params: { topicId: topicId }
    });
  };

  return (
    <View style={[styles.header, { paddingTop: topPadding + 12, paddingBottom: 12 }]}>
      <IconButton onPress={() => openDrawer()} borders={{left: true, top: true}} outerboxRadius={10} innerSize={24} style={{marginLeft: 4}} >
        <Ionicons name="menu" size={24} color={Colors.light.text[5]} />
      </IconButton>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.sectionText}>Recursos</Text>
      </View>
      <IconButton onPress={handleAddResource} style={styles.addButton} outerboxRadius={8} innerSize={28} >
        <AddIcon width={28} height={28} color="#FFFFFF" />
      </IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    marginLeft: 36,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  addButton: {
    backgroundColor: Colors.light.primary,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
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
