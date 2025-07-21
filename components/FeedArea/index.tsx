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

interface Props {
  items:FeedItem[], 
  renderItem:ListRenderItem<any>, 
  fadedEdges:InsetToggle, 
  immersiveScreen:InsetToggle, 
  overlayHeight?:number,
  additionalPadding?:number,
  numColumns?:number,
  navbarInset?:boolean,
}
export function FeedArea({items, renderItem, fadedEdges, immersiveScreen, overlayHeight = 0, additionalPadding = 0, numColumns = 0, navbarInset = false}: Props) 
  {

  const {top:topPadding, bottom:bottomPadding} = useFeedAreaInsets({immersiveScreen, fadedEdges, overlayHeight, navbarInset});
  
  return (
    <FadedOverlayContainer fadedEdges={fadedEdges} overlayHeight={overlayHeight}>
      <FlatList
        numColumns={numColumns}
        data={items} 
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[styles.flatListWrapper, {
          paddingTop:topPadding, 
          paddingBottom:bottomPadding + additionalPadding
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
