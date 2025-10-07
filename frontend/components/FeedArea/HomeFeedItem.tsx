import { Colors } from '@/constants/Colors';
import { FeedItem } from '@/constants/FeedItem';
import { ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTopics } from '@/utils/topicsContext';

export interface HomeFeedItem extends FeedItem {
  title: string;
  description?: string;
  createdAt: string;
}

function HomeFeedItemButton({item}:{item:HomeFeedItem}) {
  const { enterTopic } = useTopics();

  const handlePress = () => {
    enterTopic!(item.id, item.title, item.createdAt);
  };

  return(
    <Pressable style={styles.itemContainer} onPress={handlePress}>
      <View style={styles.picture} />
      <View style={styles.contentArea}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.descriptionText} numberOfLines={3}>{item.description ? item.description : 'Sem descrição disponível.'}</Text>
      </View>
      <View style={styles.descriptionArea}>
      </View>
    </Pressable>
  )
}
export const renderHomeFeedItem: ListRenderItem<HomeFeedItem> = ({item}) => (
  <HomeFeedItemButton item={item}></HomeFeedItemButton>
);

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
  },
  contentArea:{
    flex: 1,
    paddingVertical:12,
    gap:8,
  },
  title: {
    fontFamily:'Inter_500Medium',
    fontSize: 20,
    lineHeight:24,
    color: Colors.light.text[5],
    letterSpacing: 0.6,
  },
  descriptionArea:{
    height: 72, 
    flex: 1,
    paddingVertical:12,
    paddingHorizontal:8,
  },
  descriptionText: {
    fontFamily:'Inter_400Regular',
    fontSize: 12,
    lineHeight: 14,
    color: Colors.light.text[30],
    opacity: 0.8,
  },
  picture: {
    borderRadius: 12,
    flex: 1,
    aspectRatio: 1,
    backgroundColor: Colors.light.background[80],
  },
});