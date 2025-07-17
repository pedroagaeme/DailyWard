import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  View
} from "react-native";

export interface FeedItem {
  posterName: string;
  posterProfilePicUrl: string;
  contentPicUrl: string;
  contentText: string;
}

export function FeedArea({items}: {items:FeedItem[]}) {
  
  const renderItem: ListRenderItem<FeedItem> = ({item}) => (
    <View style={[styles.itemContainer, styles.shadowLight]}>
      <View style={styles.headerRow}>
        <Text style={styles.posterName}>{item.posterName}</Text>
      </View>
      <Text style={styles.contentText}>{item.contentText}</Text>
    </View>
  );

  return (
    <FlatList 
      data={items} 
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.flatListWrapper}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  flatListWrapper: {
    padding: 16,
    paddingBottom:300,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  shadowLight: {
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
    color: '#333333',
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
    color: '#666666',
  },
});
