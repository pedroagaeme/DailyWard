import { Colors } from '@/constants/Colors';
import { FeedItem } from '@/constants/FeedItem';
import { ListRenderItem, StyleSheet, Text, View } from 'react-native';

export interface DiaryFeedItem extends FeedItem {
  contentText: string;
  hour: string;
  posterProfilePicUrl: string,
  contentPicUrl: string;
}
export const renderDiaryFeedItem: ListRenderItem<DiaryFeedItem> = ({item}) => (
  <View style={styles.itemContainer}>
    <View style={styles.headerRow}>
      <Text style={styles.posterName}>{item.name}</Text>
      <Text style={styles.hourText}>{item.hour}</Text>
    </View>
    <Text style={styles.contentText}>{item.contentText}</Text>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 15,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent:'space-between',
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
    color: Colors.light.text[5],
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
    color: Colors.light.text[5],
    opacity:0.7,
  },
  hourText: {
    fontFamily:'Inter_400Regular',
    fontSize: 12,
    color: Colors.light.text[5],
    opacity:0.7,
  }
});