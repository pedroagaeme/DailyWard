import { ColapsibleIcon } from "@/assets/images/colapsible-icon";
import { FeedArea } from "@/components/FeedArea";
import { ResourcesFeedItem, renderResourcesFeedItem} from "@/components/FeedArea/ResourcesFeedItem";
import { SearchBar } from "@/components/SearchBar";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const sampleData: ResourcesFeedItem[] = [
  {
    name: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!",
    creationDate: "15/07/2025",
  },
  {
    name: "Jane Smith", 
    posterProfilePicUrl: "https://example.com/profile2.jpg",
    contentPicUrl: "https://example.com/post2.jpg",
    contentText: "Coffee and coding session in progress.",
    creationDate: "15/07/2025",
  },
  {
    name: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!",
    creationDate: "15/07/2025",
  },
  {
    name: "John Doe",
    posterProfilePicUrl: "https://example.com/profile1.jpg",
    contentPicUrl: "https://example.com/post1.jpg",
    contentText: "Amazing sunset at the beach today!",
    creationDate: "15/07/2025",
  },
];

export default function Resources() {
    const insets = useSafeAreaInsets();
    return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <View style={[styles.button, styles.shadow]}>
          <ColapsibleIcon/>
          <Text style={styles.contentText}>Todos os contatos</Text>
        </View>
        <SearchBar/>
      </View>
      <FeedArea 
        items={sampleData} 
        renderItem={renderResourcesFeedItem} 
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
    alignItems:'stretch',
    justifyContent:'space-between',
    backgroundColor: Colors.light.background[95],
    overflow: 'visible'
  },
  header: {
    alignItems:'flex-start',
    gap:20,
    paddingTop:20,
    paddingHorizontal:15,
  },
  button: {
    alignItems:'center',
    flexDirection:'row',
    borderWidth:1,
    backgroundColor:'white',
  borderColor: Colors.light.background[90],
    borderRadius:10,
    paddingVertical:5,
    paddingRight:20,
    paddingLeft:10,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentText: {
    fontFamily:'Inter_500Medium',
    fontSize: 20,
    lineHeight:20,
  color: Colors.light.text[5],
  },

});