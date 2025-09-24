import { useState } from 'react';
import { TopicFeedItem, renderTopicFeedItem } from '@/components/FeedArea/TopicFeedItem';
import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';
import { FeedArea } from '../../../components/FeedArea';
import { CustomDatePicker } from '@/components/CustomDatePicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateItem } from '@/components/CustomDatePicker/DateItem';
import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import { SettingsIcon } from '@/assets/images/header-icons/settings-icon';
import { useEffect } from 'react';
import { API_URL } from '@/utils/AuthContext';
import axios from 'axios';


export default function Topics() {
  const [posts, setPosts] = useState<TopicFeedItem[]>([])
  const [chosenDate, setChosenDate] = useState<DateItem>();

  return (
    <View style={styles.container}>
      <View>
        <SafeAreaView style={styles.header} edges={["top", "left", "right"]}>
          <View style={styles.row}>
            <GoBackIcon/>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Diário</Text>
              <Text style={styles.monthYearText}>{chosenDate?.monthYear}</Text>
            </View>
            <SettingsIcon/>
          </View>
          <CustomDatePicker chosenDate={chosenDate} setChosenDate={setChosenDate}/>
        </SafeAreaView>
      </View>
      <FeedArea 
        items={posts} 
        renderItem={renderTopicFeedItem} 
        fadedEdges={{top:false, bottom:false}} 
        immersiveScreen={{top:false, bottom:true}} 
        navbarInset={true}
        separator={{
          enabled: true,
          color: Colors.light.background[90],
          height: 1,
          marginVertical: 0,
          marginHorizontal: 10,
        }}
      />
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'space-between',
    backgroundColor: Colors.light.background[100], // page background is slightly darker
    overflow: 'visible',
  },
  header: {
    paddingTop:20,
    gap: 16,
  },
  row: {
    paddingHorizontal:16,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  titleContainer: {
    gap:4,
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  title: {
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
    lineHeight: 24,
    color: Colors.light.text[5],
  },
  monthYearText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.light.text[30],
    opacity:0.5,
  },
});