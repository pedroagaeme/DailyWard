import { View, ListRenderItem, StyleSheet, Text } from 'react-native';
import { FeedItem } from '@/constants/FeedItem';
import { Colors } from '@/constants/Colors';

export interface HomeFeedItem extends FeedItem {
    description?: string
}

export const renderHomeFeedItem: ListRenderItem<HomeFeedItem> = ({item}) => (
  <View style={[styles.itemContainer, styles.shadow]}>
      <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.description} numberOfLines={4}>{item.description}</Text>
  </View>
);

const styles = StyleSheet.create({
    itemContainer: {
        marginRight:10,
        marginBottom:10,
        flex:1,
        height:150,
        backgroundColor:Colors.light.primary,
        padding:20,
        borderRadius:20,
        justifyContent:'space-around',
        gap:5,
    },
    name: {
        fontFamily:'Inter_600SemiBold',
        fontSize: 16,
        color: 'white',
    },
    description: {
      opacity:0.7,
      fontFamily:'Inter_400Regular',
      fontSize: 12,
      color: 'white',
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
});