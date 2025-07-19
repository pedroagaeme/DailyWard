import { FeedItem } from '@/constants/FeedItem';
import { InsetToggle, navbarMaxHeight } from '@/constants/HeightInsets';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet
} from "react-native";
import { FadedOverlayContainer } from './FadedOverlayContainer';
import { useFeedAreaInsets } from '@/hooks/useFeedAreaInsets';

export function FeedArea({items, renderItem, fadedEdges, immersiveScreen, overlayHeight, additionalPadding}: {
  items:FeedItem[], 
  renderItem:ListRenderItem<any>, 
  fadedEdges:InsetToggle, 
  immersiveScreen:InsetToggle, 
  overlayHeight:number,
  additionalPadding?:number}) 
  {

  const additionalPaddingNumber = (additionalPadding ? additionalPadding : 0);
  const {top:topPadding, bottom:bottomPadding} = useFeedAreaInsets({immersiveScreen, fadedEdges, overlayHeight});
  
  return (
    <FadedOverlayContainer fadedEdges={fadedEdges} overlayHeight={overlayHeight}>
      <FlatList 
        data={items} 
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[styles.flatListWrapper, {
          paddingTop:topPadding, 
          paddingBottom:bottomPadding + additionalPaddingNumber
        }]}
        showsVerticalScrollIndicator={false}
      />
    </FadedOverlayContainer>
  );
}

const styles = StyleSheet.create({
  flatListWrapper: {
    padding: 16,
  },
});
