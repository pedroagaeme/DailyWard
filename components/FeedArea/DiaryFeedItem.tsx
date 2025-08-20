import { View, ListRenderItem, StyleSheet, Text } from 'react-native';
import { FeedItem } from '@/constants/FeedItem';
import { Colors } from '@/constants/Colors';

export interface DiaryFeedItem extends FeedItem {
  contentText: string;
  posterProfilePicUrl: string,
  contentPicUrl: string;
}
export const renderDiaryFeedItem: ListRenderItem<DiaryFeedItem> = ({item}) => (
  <View style={[styles.itemContainer, styles.shadow]}>
    <View style={styles.headerRow}>
      <Text style={styles.posterName}>{item.name}</Text>
    </View>
    <View style={styles.contentPic}></View>
    <Text style={styles.contentText}>{item.contentText}</Text>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  posterName: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 16,
    color: Colors.light.text,
  },
  contentPic: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  contentText: {
    fontFamily:'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.text,
    opacity:0.7,
  },
});