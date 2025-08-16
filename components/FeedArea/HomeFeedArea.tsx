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
    <Pressable style={[styles.itemContainer, styles.shadow]} onPress={handlePress}>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
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
        height:150,
        backgroundColor: Colors.light.primary,
        padding:20,
        borderRadius:20,
        justifyContent:'space-around',
        gap:5,
    },
    name: {
      fontFamily:'Inter_600SemiBold',
      fontSize: 16,
      color: 'white',
    },
    description: {
      opacity:0.7,
      fontFamily:'Inter_400Regular',
      fontSize: 14,
      color: 'white',
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
});