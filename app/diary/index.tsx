import { DiaryFeedItem, renderDiaryFeedItem } from '@/components/FeedArea/DiaryFeedItem';
import { Colors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import { FeedArea } from '../../components/FeedArea';
import { Header } from '../../components/Header';

const sampleData: DiaryFeedItem[] = [
  {
    name: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!"
  },
  {
    name: "Jane Smith", 
    posterProfilePicUrl: "https://example.com/profile2.jpg",
    contentPicUrl: "https://example.com/post2.jpg",
    contentText: "Coffee and coding session in progress."
  },
  {
    name: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!"
  },
];


export default function Diary() {
    return (
    <View style={styles.container}>
        <Header></Header>
        <FeedArea 
          items={sampleData} 
          renderItem={renderDiaryFeedItem} 
          fadedEdges={{top:true, bottom:true}} 
          immersiveScreen={{top:false, bottom:true}} 
          overlayHeight={30}
          navbarInset={true}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'space-between',
        backgroundColor: Colors.light.background, 
        overflow: 'visible'
    },
});