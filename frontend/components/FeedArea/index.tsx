import { Colors } from '@/constants/Colors';
import { FeedItem } from '@/constants/FeedItem';
import { heightInsets, InsetToggle } from '@/constants/HeightInsets';
import { useFeedAreaInsets } from '@/hooks/useFeedAreaInsets';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  View
} from "react-native";
import { FadedOverlayContainer } from './FadedOverlayContainer';

interface Props {
  items:FeedItem[], 
  renderItem:ListRenderItem<any>, 
  fadedEdges:InsetToggle, 
  immersiveScreen:InsetToggle, 
  overlayHeight?:number,
  additionalPadding?:heightInsets,
  numColumns?:number,
  navbarInset?:boolean,
  separator?: {
    enabled?: boolean;
    color?: string;
    height?: number;
    marginVertical?: number;
    marginHorizontal?: number;
  };
}

export function FeedArea({items, renderItem, fadedEdges, immersiveScreen, overlayHeight = 0, additionalPadding = {top:0, bottom: 0}, numColumns = 0, navbarInset = false, separator}: Props) 
  {

  const {top:topPadding, bottom:bottomPadding} = useFeedAreaInsets({immersiveScreen, fadedEdges, overlayHeight, navbarInset});
  
  const ItemSeparator = () => {
    if (!separator?.enabled) return null;
    
    return (
      <View style={
        {
          backgroundColor: separator.color || Colors.light.background[95],
          height: separator.height || 1,
          marginVertical: separator.marginVertical || 0,
          marginHorizontal: separator.marginHorizontal || 0,
        }
      } />
    );
  };

  const renderItemWithPadding = (info: any) => {
    return (
      <View style={styles.itemWrapper}>
        {renderItem(info)}
      </View>
    );
  };
  
  return (
    <MaskedView  style={{flex:1}} maskElement={<FadedOverlayContainer fadedEdges={fadedEdges} overlayHeight={overlayHeight}/>}>
      <FlatList
        numColumns={numColumns}
        data={items}
        renderItem={renderItemWithPadding}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[styles.flatListWrapper, {
          paddingTop:topPadding + additionalPadding.top, 
          paddingBottom:bottomPadding + additionalPadding.bottom
        }]}
        columnWrapperStyle={numColumns > 1 ? { gap: 20 } : undefined} // Adds horizontal gap between items in a row if multiple columns
        showsVerticalScrollIndicator={false}
      />
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  flatListWrapper: {
    paddingHorizontal: 16,
  },
  itemWrapper: {
    flex: 1,
  },
});
