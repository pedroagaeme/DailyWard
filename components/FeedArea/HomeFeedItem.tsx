import { Colors } from '@/constants/Colors';
import { FeedItem } from '@/constants/FeedItem';
import { useRouter } from 'expo-router';
import { ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';

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
      <View style={styles.contentArea}>
        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.descriptionText} numberOfLines={3}>{item.description}</Text>
      </View>
      <View style={styles.picture} />
    </Pressable>
  )
}
export const renderHomeFeedItem: ListRenderItem<HomeFeedItem> = ({item}) => (
  <HomeFeedItemButton item={item}></HomeFeedItemButton>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.light.background[100],
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: Colors.light.background[90],
    flexDirection: 'row',
    overflow: 'hidden',
  },
  contentArea:{
    flex: 1,
    padding:24,
    gap: 12,
    justifyContent: 'center',
  },
  title: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 18,
    color: Colors.light.text[5],
    lineHeight: 20,
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily:'Inter_400Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.light.text[30],
  },
  picture: {
    backgroundColor: Colors.light.primary,
    height:144,
    aspectRatio: 0.7,
  },
});