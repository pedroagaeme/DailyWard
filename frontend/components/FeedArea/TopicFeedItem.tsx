import { Colors } from '@/constants/Colors';
import { FeedItem } from '@/constants/FeedItem';
import { ListRenderItem, StyleSheet, Text, View } from 'react-native';

export interface TopicFeedItem extends FeedItem {
  posterName: string;
  contentText: string;
  createdAt: string;
  posterProfilePicUrl: string,
  contentPicUrl: string;
}
export const renderTopicFeedItem: ListRenderItem<TopicFeedItem> = ({item}) => (
  <View style={styles.itemContainer}>
    <View style={styles.headerRow}>
      <View style={styles.profileSection}>
        <View style={styles.profilePic}/>
        <Text style={styles.posterName}>{item.posterName}</Text>
      </View>
      <Text style={styles.hourText}>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
    </View>
    {item.contentText && <Text style={styles.contentText} numberOfLines={3}>{item.contentText}</Text>}
    {item.contentPicUrl && <View style={styles.contentPic} />}
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 4,
    paddingTop: 24,
    paddingBottom: 28,
    gap:12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:12,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.background[90],
  },
  posterName: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text[5],
  },
  contentPic: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 12,
    backgroundColor: Colors.light.background[90],
  },
  contentText: {
    fontFamily:'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.text[30],
  },
  hourText: {
    fontFamily:'Inter_400Regular',
    fontSize: 12,
    letterSpacing:0.5,
    color: Colors.light.text[30],
  }
});