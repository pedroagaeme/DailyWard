import { FeedArea } from '@/components/FeedArea';
import { HomeFeedItem, renderHomeFeedItem } from '@/components/FeedArea/HomeFeedItem';
import { Colors } from '@/constants/Colors';
import { StyleSheet, Text, View } from 'react-native';
import { GoToCreateTopicButton } from '@/components/GoToCreateTopicButton';
import { useTopics } from '@/utils/topicsContext';

export default function Home() {
  const topics: HomeFeedItem[] = useTopics()?.topics || [];
  
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.row}>
            <Text style={styles.feedTitleText}>Seus Tópicos</Text>
            <GoToCreateTopicButton />
          </View>
        </View>
        <FeedArea 
            items={topics} 
            renderItem={renderHomeFeedItem} 
            immersiveScreen={{top:false, bottom:true}}
            fadedEdges={{top:false, bottom:false}}
            additionalPadding={{top:12, bottom:0}}
            numColumns={2}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.light.background[95],
    overflow: 'visible',
    gap:12,
  },
  header: {
    paddingHorizontal:16,
    paddingTop:12,
    paddingBottom:0,
    gap:12,
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
    fontSize:24,
    lineHeight: 28,
    color: Colors.light.text[5],
  },
  profilePic: {
  },
});
