import { Colors } from '@/constants/Colors';
import { FeedItem } from '@/constants/FeedItem';
import { ListRenderItem, StyleSheet, Text, View } from 'react-native';

export interface ResourcesFeedItem extends FeedItem {
    title: string;
    type?: string;
    description?: string;
}

export const renderResourcesFeedItem: ListRenderItem<ResourcesFeedItem> = ({item}) => (
  <View style={styles.itemContainer}>
    <View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.descriptionText}>{item.description}</Text>
    </View>
    <View style={styles.footerRow}>
      <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
        <View style={styles.posterProfilePic}>
          {/* Placeholder for profile picture */}
        </View>
        <View style={styles.nameAndDateContainer}>
          <Text style={styles.posterName}>{item.title}</Text>
          <Text style={styles.dateText}>2 dias atrás</Text>
        </View>
      </View>
      <View style={styles.typeBadge}>
        <Text style={styles.typeBadgeText}>{item.type}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.light.background[100],
    borderRadius: 15,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1.2,
    borderColor: Colors.light.background[90],
    gap:25,
  },
  footerRow: {
    gap:12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  posterName: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 13,
    lineHeight: 16,
    color: Colors.light.text[5],
  },
  title: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 18,
    color: Colors.light.text[5],
    lineHeight: 20,
    marginBottom: 10,
  },
  nameAndDateContainer: {
    gap: 5,
  },
  dateText: {
    fontFamily:'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Colors.light.text[30],
    opacity: 0.9,
  },
  descriptionText: {
    fontFamily:'Inter_400Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.light.text[30],
  },
  posterProfilePic: {
    width: 35,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: Colors.light.background[90],
  },
  typeBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.light.background[95],
  },
  typeBadgeText: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.light.text[30],
    textAlign: 'center',
  },
});
