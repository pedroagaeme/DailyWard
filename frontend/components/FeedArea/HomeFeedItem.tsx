import { Colors } from '@/constants/Colors';
import { FeedItem } from '@/constants/FeedItem';
import { useTopics } from '@/utils/topicsContext';
import { ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';

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
        <Text style={styles.descriptionText} numberOfLines={2}>{item.description ? item.description : 'Sem descrição disponível.'}</Text>
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
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: Colors.light.background[100],
    borderWidth: 1,
    borderColor: Colors.light.background[90],
  },
  contentArea:{
    flex: 1,
    height: 90,
    paddingHorizontal: 12,
    paddingVertical:12,
    gap:6,
  },
  title: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 16,
    lineHeight:20,
    color: Colors.light.text[5],
  },
  descriptionText: {
    fontFamily:'Inter_400Regular',
    fontSize: 12,
    lineHeight: 18,
    color: Colors.light.text[30],
  },
  picture: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.light.background[90],
  },
});