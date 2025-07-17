import { Colors } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FeedArea, FeedItem } from '../../components/feed-area';
import { Header } from '../../components/header';
import { Navbar } from '../../components/navbar';

const sampleData: FeedItem[] = [
  {
    posterName: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!"
  },
  {
    posterName: "Jane Smith", 
    posterProfilePicUrl: "https://example.com/profile2.jpg",
    contentPicUrl: "https://example.com/post2.jpg",
    contentText: "Coffee and coding session in progress."
  },
  {
    posterName: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!"
  },
  {
    posterName: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!"
  },
];


export function Diary() {
    return (
    <View style={styles.container}>
        <Header></Header>
        <FeedArea items={sampleData}/>
        <SafeAreaView style={styles.overlay} pointerEvents='box-none'>
            <Navbar/>
        </SafeAreaView>
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
    behindLayer: {
        flex:1,
    },
    overlay: {
        position:'absolute',
        height:'100%',
        width:'100%',
        justifyContent:'flex-end',
        paddingBottom:30,
    },
});