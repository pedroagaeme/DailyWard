import { Colors } from '@/constants/Colors';
import { ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';
import { CustomImage } from '@/components/CustomImage';
import { HomeFeedItem } from '@/types';
import { router } from 'expo-router';
import { TopicBottomSheet } from '@/components/TopicBottomSheet';

function HomeFeedItemButton({item}:{item:HomeFeedItem}) {

  const handlePress = () => {
    router.push({pathname: '/topics/[topicId]/tabs', params: {topicId: item.id}});
  };
  
  return(
    <Pressable onPress={handlePress}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <CustomImage 
            source={item.topicImageUrl}
            fallbackSource={require('@/assets/images/default-topic-image.png')}
            style={styles.picture}
            overlayStyle={styles.pictureOverlay}
          />
        </View>
        <View style={styles.contentArea}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Pressable onPress={(e) => e.stopPropagation()}>
              <TopicBottomSheet topicId={item.id} borders={{}} />
            </Pressable>
          </View>
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
    marginBottom: 12,
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
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  title: {
    flex: 1,
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