import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomDatePicker } from '@/components/CustomDatePicker';
import { DateItem } from '@/components/CustomDatePicker/components/DateItem';
import { DateTime } from 'luxon';

interface PostsHeaderProps {
  title: string;
  chosenDate: DateItem;
  setChosenDate: React.Dispatch<React.SetStateAction<DateItem>>;
  topicCreationDate?: string;
}

export const PostsHeader = ({ 
  title, 
  chosenDate, 
  setChosenDate, 
  topicCreationDate 
}: PostsHeaderProps) => {
  const navigation = useNavigation();
  const { top: topPadding } = useSafeAreaInsets();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: topPadding + 12, paddingBottom: 12 }]}>
        <Pressable onPress={openDrawer} style={styles.drawerButton}>
          <Ionicons name="menu" size={24} color={Colors.light.text[5]} />
        </Pressable>
        
        <View style={styles.titleContainer}>
          <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.monthYearText}>
            {chosenDate.monthYear}
          </Text>
        </View>
        
        <View style={styles.placeholder} />
      </View>
      <View style={styles.datePickerContainer}>
        <CustomDatePicker 
          chosenDate={chosenDate} 
          setChosenDate={setChosenDate}
          topicCreationDate={DateTime.fromISO(topicCreationDate!)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background[100],
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background[100],
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
    gap: 4,
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
  monthYearText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.light.text[30],
    opacity: 0.9,
    textAlign: 'center',
  },
  datePickerContainer: {
    backgroundColor: Colors.light.background[100],
    paddingTop: 6,
    gap: 16,
  },
});
