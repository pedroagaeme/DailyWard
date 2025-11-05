import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from '@/components/IconButton';

interface ParticipantsHeaderProps {
  title: string;
}

export const ParticipantsHeader = ({ title }: ParticipantsHeaderProps) => {
  const { top: topPadding } = useSafeAreaInsets();
  const navigation = useNavigation();

  const openDrawer = () => {
      navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={[styles.header, { paddingTop: topPadding + 12, paddingBottom: 12 }]}>
      <IconButton onPress={() => openDrawer()} style={{marginLeft: 4}}>
        <Ionicons name="menu" size={24} color={Colors.light.text[5]} />
      </IconButton>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
        <Text style={styles.sectionText}>Participantes</Text>
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
  titleContainer: {
    flex: 1,  
    alignItems: 'center',
    marginHorizontal: 20,
  },
  placeholder: {
    width: 28,
    height: 28,
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
