import { useState } from 'react';
import { DiaryFeedItem, renderDiaryFeedItem } from '@/components/FeedArea/DiaryFeedItem';
import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';
import { FeedArea } from '../../components/FeedArea';
import { CustomDatePicker } from '@/components/CustomDatePicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateItem } from '@/components/CustomDatePicker/DateItem';
import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import { SettingsIcon } from '@/assets/images/header-icons/settings-icon';

const sampleData: DiaryFeedItem[] = [
  {
    name: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Na aula de hoje, realizamos uma atividade prática de matemática usando blocos coloridos para trabalhar o conceito de adição. Cada aluno recebeu um conjunto de blocos para montar pequenas torres que representaram diferentes operações.",
    hour: "14:30",
  },
  {
    name: "Jane Smith", 
    posterProfilePicUrl: "https://example.com/profile2.jpg",
    contentPicUrl: "https://example.com/post2.jpg",
    contentText: "Coffee and coding session in progressdsadbjoiasduibasdbuiasdbuioasbuidoasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssu.",
    hour: "09:15",
  },
  {
    name: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!",
    hour: "14:30",
  },
  {
    name: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!",
    hour: "14:30",
  },
  {
    name: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!",
    hour: "14:30",
  },
  {
    name: "Jane Smith", 
    posterProfilePicUrl: "https://example.com/profile2.jpg",
    contentPicUrl: "https://example.com/post2.jpg",
    contentText: "Coffee and coding session in progress.",
    hour: "09:15",
  },
  {
    name: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!",
    hour: "14:30",
  },
  {
    name: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!",
    hour: "14:30",
  },
];


export default function Diary() {
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
        items={sampleData} 
        renderItem={renderDiaryFeedItem} 
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