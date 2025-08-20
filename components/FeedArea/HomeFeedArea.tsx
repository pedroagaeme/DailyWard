import { View, ListRenderItem, StyleSheet, Text, Pressable } from 'react-native';
import { FeedItem } from '@/constants/FeedItem';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';

export interface HomeFeedItem extends FeedItem {
    description?: string
}

function HomeFeedItemButton({item}:{item:HomeFeedItem}) {
  const router = useRouter();
  const handlePress = () => {
    router.push('/diary')
  };
  return(
    <Pressable style={styles.itemContainer} onPress={handlePress}>
      <View style={styles.row}>
        <View style={styles.picture}></View>
        <View style={styles.textContainer}>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        </View>
      </View>
    </Pressable>
  )
}
export const renderHomeFeedItem: ListRenderItem<HomeFeedItem> = ({item}) => (
  <HomeFeedItemButton item={item}></HomeFeedItemButton>
);

const styles = StyleSheet.create({
    itemContainer: {
      marginLeft:5,
      marginRight:5,
      marginBottom:10,
      flex:1,
      backgroundColor:Colors.light.tertiary,
      padding:15,
      borderRadius:20,
      justifyContent:'space-around',
    },
    row: {
      flexDirection:'row',
      gap: 14,
    },
    name: {
      fontFamily:'Inter_600SemiBold',
      fontSize: 16,
      color: Colors.light.text,
    },
    description: {
      opacity:0.7,
      fontFamily:'Inter_400Regular',
      fontSize: 12,
      color: Colors.light.text,
    },
    picture: {
      backgroundColor:'white',
      height:60,
      aspectRatio:1,
      borderRadius:10,
    },
    textContainer: {
      flex:1,
      gap:5,
    },
});