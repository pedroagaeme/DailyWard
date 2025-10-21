import { Colors } from '@/constants/Colors';
import { FeedItem, HeightInsets, InsetToggle } from '@/types';
import { useFeedAreaInsets } from '@/hooks/useFeedAreaInsets';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
  FlatListProps,
  RefreshControl
} from "react-native";
import { FadedOverlayContainer } from './components/FadedOverlayContainer';

interface Props extends FlatListProps<any> {
  fadedEdges:InsetToggle, 
  immersiveScreen:InsetToggle, 
  overlayHeight?:number,
  additionalPadding?:HeightInsets,
  navbarInset?:boolean,
  noHorizontalPadding?: boolean;
}

const gapBetweenItems = 8;
const flatListPaddingHorizontal = 16; // FlatList horizontal padding

export function FeedArea({
  fadedEdges, 
  immersiveScreen, 
  overlayHeight = 0, 
  additionalPadding = {top:0, bottom: 0}, 
  navbarInset = false,    noHorizontalPadding = false,
  ...flatListProps
}: Props) 
  {

  const {top:topPadding, bottom:bottomPadding} = useFeedAreaInsets({immersiveScreen, fadedEdges, overlayHeight, navbarInset});
  const {width:windowWidth} = Dimensions.get('window');
  const numColumns = flatListProps.numColumns || 1;
  const itemWidth = (windowWidth - (noHorizontalPadding ? 0 : flatListPaddingHorizontal * 2) - (gapBetweenItems * (numColumns - 1))) / (numColumns);
  
  const renderItemWithPadding = (info: any) => {
    return (
      <View style={[styles.itemWrapper, {width: itemWidth}]}>
        {flatListProps.renderItem?.(info)}
      </View>
    );
  };
  console.log('flatListProps');
  
  return (
    <MaskedView  style={{flex:1}} maskElement={<FadedOverlayContainer fadedEdges={fadedEdges} overlayHeight={overlayHeight}/>}>
      <FlatList
        {...flatListProps}
        renderItem={renderItemWithPadding}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={[styles.flatListWrapper, {
          paddingTop:topPadding + additionalPadding.top, 
          paddingBottom:bottomPadding + additionalPadding.bottom
        }, noHorizontalPadding ? {} : {paddingHorizontal: flatListPaddingHorizontal}]} // Apply horizontal padding only if noHorizontalPadding is false
        columnWrapperStyle={numColumns > 1 ? { gap: gapBetweenItems } : undefined} // Adds horizontal gap between items in a row if multiple columns
        showsVerticalScrollIndicator={false}
      />
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  flatListWrapper: {
  },
  itemWrapper: {
  },
});
