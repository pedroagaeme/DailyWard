import { FeedArea } from '@/components/FeedArea';
import { HomeFeedItem, renderHomeFeedItem } from '@/components/FeedArea/HomeFeedItem';
import { SearchBar } from '@/components/SearchBar';
import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const sampleData:HomeFeedItem[] = [
  {
    name: "Daily Exercise",
    description: "Track workouts, running sessions, gym visits, and physical activity goals"
  },
  {
    name: "Book Reading",
    description: "Keep a record of books read, currently reading, and reading goals for the year"
  },
  {
    name: "Monthly Budget",
    description: "Monitor income, expenses, savings, and financial goals on a monthly basis"
  },
  {
    name: "Water Intake",
    description: "Log daily water consumption to maintain proper hydration levels"
  },
  {
    name: "Meditation Sessions",
    description: "Record mindfulness practice, meditation duration, and mental wellness progress"
  },
  {
    name: "Language Learning",
    description: "Track vocabulary learned, lessons completed, and fluency progress in new languages"
  },
  {
    name: "Sleep Quality",
    description: "Monitor sleep hours, bedtime routine, and overall sleep health patterns"
  },
  {
    name: "Habit Building",
    description: "Track daily habits, streak counters, and personal development goals"
  },
  {
    name: "Daily Exercise",
    description: "Track workouts, running sessions, gym visits, and physical activity goals"
  },
  {
    name: "Book Reading",
    description: "Keep a record of books read, currently reading, and reading goals for the year"
  },
  {
    name: "Monthly Budget",
    description: "Monitor income, expenses, savings, and financial goals on a monthly basis"
  },
  {
    name: "Water Intake",
    description: "Log daily water consumption to maintain proper hydration levels"
  },
  {
    name: "Meditation Sessions",
    description: "Record mindfulness practice, meditation duration, and mental wellness progress"
  },
  {
    name: "Language Learning",
    description: "Track vocabulary learned, lessons completed, and fluency progress in new languages"
  },
  {
    name: "Sleep Quality",
    description: "Monitor sleep hours, bedtime routine, and overall sleep health patterns"
  },
  {
    name: "Habit Building",
    description: "Track daily habits, streak counters, and personal development goals"
  },
];
export default function App() {
    return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top', 'left', 'right']}>
        <View style={styles.row}>
          <Text style={styles.feedTitleText}>Seus Diários</Text>
        </View>
      </SafeAreaView>
      <SearchBar placeholder='Buscar Diários...' color={Colors.light.background[100]}/>
      <FeedArea 
          items={sampleData} 
          renderItem={renderHomeFeedItem} 
          immersiveScreen={{top:false, bottom:true}}
          fadedEdges={{top:false, bottom:false}}
          additionalPadding={{top:12, bottom:0}}
          numColumns={1}
      />
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.light.background[95],
    overflow: 'visible',
    gap:24,
  },
  header: {
    padding:16,
    paddingBottom:0,
    gap:20,
  },
  row: {
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
  },
  greetingsText: {
    fontFamily: 'Inter_400Regular',
    fontSize:16,
    color:  Colors.light.text[30],
  },
  feedTitleText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize:28,
    lineHeight: 34,
    color: Colors.light.text[5],
  },
  profilePic: {
  },
});
