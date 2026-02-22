import { Colors } from '@/constants/Colors';
import { FeedItem, HeightInsets, InsetToggle } from '@/types';
import { useFeedAreaInsets } from '@/hooks/useFeedAreaInsets';
import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  ScrollView,
  useWindowDimensions
} from "react-native";
import Animated, { FadeInDown, FadeOutUp, FlatListPropsWithLayout, LinearTransition, useAnimatedStyle } from 'react-native-reanimated';
import { FeedAreaProvider, useFeedAreaContext } from '@/contexts/feedAreaContext';

interface Props extends FlatListPropsWithLayout<any> {
  data: any[];
  immersiveScreen:InsetToggle, 
  additionalPadding?:HeightInsets,
  navbarInset?:boolean,
  noHorizontalPadding?: boolean;
  onEndReached?: () => void;
}

const gapBetweenItems = 8;
const flatListPaddingHorizontal = 16; // FlatList horizontal padding

function FeedAreaContent({
  immersiveScreen, 
  additionalPadding = {top:0, bottom: 0}, 
  navbarInset = false,    noHorizontalPadding = false,
  onEndReached,
  ...flatListProps
}: Props) 
  {
  const dataLength = useRef<number>(flatListProps.data.length);
  const previousDataLength = useRef<number>(flatListProps.data.length);

  const {top:topPadding, bottom:bottomPadding} = useFeedAreaInsets({immersiveScreen, navbarInset});
  const windowWidth = useWindowDimensions().width;
  const numColumns = Number(flatListProps.numColumns) || 1;
  const itemWidth = (windowWidth - (noHorizontalPadding ? 0 : flatListPaddingHorizontal * 2) - (gapBetweenItems * (numColumns - 1))) / (numColumns);
  
  const { bottomPadding: feedBottomPadding, onDataChange } = useFeedAreaContext();

  // Initialize data length on mount and watch for changes to trigger revert
  useEffect(() => {
    const currentLength = flatListProps.data.length;
    // Always update to track current length (handles both initial mount and changes)
    onDataChange(currentLength);
    previousDataLength.current = currentLength;
  }, [flatListProps.data.length, onDataChange]);
  
  const renderItemWithPadding: ListRenderItem<any> = ({item, index}: {item: any, index: number}) => {
    return (
      <Animated.View style={[styles.itemWrapper, {width: itemWidth}]} entering={FadeInDown.springify().delay(150)}
      exiting={FadeOutUp.springify()}>
        {typeof flatListProps.renderItem === 'function' ? flatListProps.renderItem({item, index, separators: {highlight: () => {}, unhighlight: () => {}, updateProps: () => {}}}) : null}
      </Animated.View>
    )
  };

  const feedAreaStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: feedBottomPadding.value,
    }
  })

  const animatedFooterStyle = useAnimatedStyle(() => {
    return {
      height: feedBottomPadding.value,
    }
  })

  const ListFooterComponent = () => (
    <Animated.View style={animatedFooterStyle} />
  )

  if( numColumns > 1) {
    return (
      <ScrollView>
        <Animated.View style={[{flexDirection: 'row', flexWrap: 'wrap', gap: gapBetweenItems, paddingHorizontal: flatListPaddingHorizontal}, feedAreaStyle]}>
          {flatListProps.data?.map((item, index) => (
              <Animated.View key={item.id} style={[styles.itemWrapper, {width: itemWidth}]} layout={LinearTransition}>
                {typeof flatListProps.renderItem === 'function' ? renderItemWithPadding({item, index, separators: {highlight: () => {}, unhighlight: () => {}, updateProps: () => {}}}) : null}
              </Animated.View>
            ))}
        </Animated.View>
      </ScrollView>
    )
  }

  return (
    <Animated.FlatList 
      {...flatListProps}
      itemLayoutAnimation={LinearTransition}
      renderItem={renderItemWithPadding}
      ListFooterComponent={ListFooterComponent}
      contentContainerStyle={[styles.flatListWrapper, {
        paddingTop:topPadding + additionalPadding.top, 
        paddingBottom:bottomPadding + additionalPadding.bottom
      }, noHorizontalPadding ? {} : {paddingHorizontal: flatListPaddingHorizontal}]} // Apply horizontal padding only if noHorizontalPadding is false
      showsVerticalScrollIndicator={false}
    />
  );
}

export function FeedArea(props: Props) {
  return (
    <FeedAreaProvider>
      <FeedAreaContent {...props} />
    </FeedAreaProvider>
  );
}

const styles = StyleSheet.create({
  flatListWrapper: {
  },
  itemWrapper: {
  },
});
