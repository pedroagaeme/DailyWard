import { Colors } from '@/constants/Colors';
import { FeedItem } from '@/constants/FeedItem';
import { useRouter } from 'expo-router';
import { ListRenderItem, Pressable, StyleSheet, Text, View } from 'react-native';

export interface HomeFeedItem extends FeedItem {
    description?: string
}

function HomeFeedItemButton({item}:{item:HomeFeedItem}) {
  const router = useRouter();
  const handlePress = () => {
    router.push('/diary')
  };
  return(
    <Pressable style={styles.itemContainer} onPress={handlePress}>
      <View style={styles.picture} />
      <View style={styles.contentArea}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={3}>{item.description}</Text>
      </View>
    </Pressable>
  )
}
export const renderHomeFeedItem: ListRenderItem<HomeFeedItem> = ({item}) => (
  <HomeFeedItemButton item={item}></HomeFeedItemButton>
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.light.background[100],
    borderRadius: 12,
    padding: 0,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: Colors.light.background[90],
    flexDirection: 'row',
    overflow: 'hidden',
  },
  picture: {
    backgroundColor: Colors.light.primary,
    width: 80,
    height: '100%',
    flexShrink: 0,
  },
  contentArea: {
    flex: 1,
    padding: 16,
    gap: 8,
    justifyContent: 'center',
  },
  name: {
    fontFamily:'Inter_500Medium',
    fontSize: 18,
    lineHeight: 22,
    color: Colors.light.text[5],
    letterSpacing: -0.1,
  },
  description: {
    fontFamily:'Inter_400Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.light.text[30],
    opacity: 0.8,
    letterSpacing: 0.05,
  },
});