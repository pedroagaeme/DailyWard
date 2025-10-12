import { Colors } from '@/constants/Colors';
import { FeedItem } from '@/constants/FeedItem';
import { ListRenderItem, StyleSheet, Text, View, Image } from 'react-native';

export interface TopicFeedItem extends FeedItem {
  posterName: string;
  contentText: string;
  createdAt: string;
  posterProfilePicUrl: string,
  contentPic: string;
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
    <View style={styles.contentArea}>
    {item.contentText && <Text style={styles.contentText} numberOfLines={3}>{item.contentText}</Text>}
    {item.contentPic && <Image source={{ uri: item.contentPic }} style={styles.contentPic} />}
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.light.background[100],
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 8,
    gap:12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 4,
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
  contentArea: {
    flex:1,
    gap:16,
  },
  contentPic: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.background[90],
    backgroundColor: Colors.light.background[90],
    resizeMode: 'cover',
  },
  contentText: {
    fontFamily:'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.light.text[5],
  },
  hourText: {
    fontFamily:'Inter_400Regular',
    fontSize: 12,
    letterSpacing:0.5,
    color: Colors.light.text[30],
  }
});