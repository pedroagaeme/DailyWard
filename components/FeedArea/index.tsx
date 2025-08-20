import { FeedItem } from '@/constants/FeedItem';
import { heightInsets, InsetToggle } from '@/constants/HeightInsets';
import React from 'react';
import {
  FlatList,
  ListRenderItem,
  StyleSheet
} from "react-native";
import { FadedOverlayContainer } from './FadedOverlayContainer';
import { useFeedAreaInsets } from '@/hooks/useFeedAreaInsets';
import MaskedView from '@react-native-masked-view/masked-view';

interface Props {
  items:FeedItem[], 
  renderItem:ListRenderItem<any>, 
  fadedEdges:InsetToggle, 
  immersiveScreen:InsetToggle, 
  overlayHeight?:number,
  additionalPadding?:heightInsets,
  numColumns?:number,
  navbarInset?:boolean,
}
export function FeedArea({items, renderItem, fadedEdges, immersiveScreen, overlayHeight = 0, additionalPadding = {top:0, bottom: 0}, numColumns = 0, navbarInset = false}: Props) 
  {

  const {top:topPadding, bottom:bottomPadding} = useFeedAreaInsets({immersiveScreen, fadedEdges, overlayHeight, navbarInset});
  
  return (
    <MaskedView  style={{flex:1}} maskElement={<FadedOverlayContainer fadedEdges={fadedEdges} overlayHeight={overlayHeight}/>}>
      <FlatList
        numColumns={numColumns}
        data={items} 
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[styles.flatListWrapper, {
          paddingTop:topPadding + additionalPadding.top, 
          paddingBottom:bottomPadding + additionalPadding.bottom
        }]}
        showsVerticalScrollIndicator={false}
      />
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  flatListWrapper: {
    paddingHorizontal:10,
  },
});
