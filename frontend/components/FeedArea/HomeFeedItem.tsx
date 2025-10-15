import { Colors } from '@/constants/Colors';
import { FeedItem } from '@/constants/FeedItem';
import { useTopics } from '@/utils/topicsContext';
import { ListRenderItem, Pressable, StyleSheet, Text, View, Image } from 'react-native';

export interface HomeFeedItem extends FeedItem {
  title: string;
  description?: string;
  topicImageUrl: string;
  createdAt: string;
  code: string;
}

function HomeFeedItemButton({item}:{item:HomeFeedItem}) {
  const { enterTopic } = useTopics();

  const handlePress = () => {
    enterTopic!(item.code, item.id, item.title, item.createdAt);
  };

  return(
    <Pressable onPress={handlePress}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.picture}  source={item.topicImageUrl ? { uri: item.topicImageUrl } : require('@/assets/images/default-topic-image.png')}/>
          <View style={styles.pictureOverlay} />
        </View>
        <View style={styles.contentArea}>
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.descriptionText} numberOfLines={2}>{item.description && item.description !== "undefined" ? item.description : 'Sem descrição disponível.'}</Text>
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
    flex:1,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: Colors.light.background[95],
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  contentArea:{
    flex: 1,
    height: 90,
    padding: 12,
    paddingVertical: 14,
    gap: 6,
  },
  title: {
    fontFamily:'Inter_600SemiBold',
    letterSpacing: 0.1,
    fontSize: 16,
    lineHeight: 20,
    color: Colors.light.text[5],
  },
  descriptionText: {
    fontFamily:'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Colors.light.text[30],
    opacity: 0.8,
  },
  imageContainer: {
    width: '100%',
  },
  picture: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
    filter: 'saturate(0.9) brightness(0.975)',
  },
  pictureOverlay: { 
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopEndRadius: 12,
    boxShadow: '0 -1px 4px rgba(0, 0, 0, 0.1) inset',
  },
});