import { ColapsibleIcon } from "@/assets/images/colapsible-icon";
import { SearchIcon } from "@/assets/images/search-icon";
import { FeedArea } from "@/components/FeedArea";
import { ResourcesFeedItem, renderResourcesFeedItem} from "@/components/FeedArea/ResourcesFeedItem";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TextInput, View } from "react-native";
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
        <View style={styles.searchBar}>
          <SearchIcon height={28}/>
          <TextInput style={styles.searchInput}/>
        </View>
      </View>
      <FeedArea 
        items={sampleData} 
        renderItem={renderResourcesFeedItem} 
        fadedEdges={{top:true, bottom:true}} 
        immersiveScreen={{top:false, bottom:true}}
        overlayHeight={40}
      />
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'stretch',
    justifyContent:'space-between',
    backgroundColor: Colors.light.background, 
    overflow: 'visible'
  },
  header: {
    alignItems:'flex-start',
    gap:20,
    paddingTop:20,
    paddingHorizontal:20,
  },
  button: {
    alignItems:'center',
    flexDirection:'row',
    borderWidth:1,
    backgroundColor:'white',
    borderColor: Colors.light.primary,
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
    color: Colors.light.primary,
  },
  searchBar: {
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    backgroundColor: '#F6F6F6',
    borderRadius: 20,
    paddingHorizontal:10,
    gap:5,
    borderWidth: 1,
    borderColor: '#7C7C7C',
  },
  searchInput: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 0,
    color: '#424242',
  },
});