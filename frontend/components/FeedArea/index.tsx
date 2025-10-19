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
  View
} from "react-native";
import { FadedOverlayContainer } from './components/FadedOverlayContainer';

interface Props {
  items:FeedItem[],
  listHeaderComponent?: React.ReactElement,
  renderItem:ListRenderItem<any>, 
  fadedEdges:InsetToggle, 
  immersiveScreen:InsetToggle, 
  overlayHeight?:number,
  additionalPadding?:HeightInsets,
  numColumns?:number,
  navbarInset?:boolean,
  separator?: {
    enabled?: boolean;
    color?: string;
    height?: number;
    marginVertical?: number;
    marginHorizontal?: number;
  };
  noHorizontalPadding?: boolean;
}

const gapBetweenItems = 8;
const flatListPaddingHorizontal = 16; // FlatList horizontal padding

export function FeedArea({
  items,
  listHeaderComponent,
  renderItem, 
  fadedEdges, 
  immersiveScreen, 
  overlayHeight = 0, 
  additionalPadding = {top:0, bottom: 0}, 
  numColumns = 1, 
  navbarInset = false, 
  separator, 
  noHorizontalPadding = false}: Props) 
  {

  const {top:topPadding, bottom:bottomPadding} = useFeedAreaInsets({immersiveScreen, fadedEdges, overlayHeight, navbarInset});
  const {width:windowWidth} = Dimensions.get('window');
  const itemWidth = (windowWidth - (noHorizontalPadding ? 0 : flatListPaddingHorizontal * 2) - (gapBetweenItems * (numColumns - 1))) / (numColumns);
  
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
      <View style={[styles.itemWrapper, {width: itemWidth}]}>
        {renderItem(info)}
      </View>
    );
  };
  
  return (
    <MaskedView  style={{flex:1}} maskElement={<FadedOverlayContainer fadedEdges={fadedEdges} overlayHeight={overlayHeight}/>}>
      <FlatList
        ListHeaderComponent={listHeaderComponent}
        numColumns={numColumns}
        data={items}
        renderItem={renderItemWithPadding}
        ItemSeparatorComponent={ItemSeparator}
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
