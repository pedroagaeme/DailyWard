import { View, ListRenderItem, StyleSheet, Text } from 'react-native';
import { FeedItem } from '@/constants/FeedItem';
import { Colors } from '@/constants/Colors';

export interface ContactsFeedItem extends FeedItem {
    lastMessage?: string;
}
export const renderContactsFeedItem: ListRenderItem<ContactsFeedItem> = ({item}) => (
  <View style={[styles.itemContainer, styles.shadow]}>
    <View style={styles.headerRow}>
      <Text style={styles.posterName}>{item.name}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding:24,
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
  },
  posterName: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 16,
  color: Colors.light.text[30],
  },
});