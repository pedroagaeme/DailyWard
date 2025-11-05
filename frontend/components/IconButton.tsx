import React from 'react';
import { Pressable, StyleSheet, ViewStyle, PressableProps, View } from 'react-native';

interface IconButtonProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  outerboxRadius?: number;
  borders?: {top?: boolean, right?: boolean, bottom?: boolean, left?: boolean};
  innerSize?: number;
}

export const IconButton = ({ 
  children, 
  style,
  outerboxRadius = 0,
  innerSize = 24,
  borders = {top: false, right: false, bottom: false, left: false}, 
  ...pressableProps 
}: IconButtonProps) => {
  return (
    <View style={style}>
      {children}
      <Pressable style={
        [styles.outerbox, 
          {
            width: outerboxRadius * 2 + innerSize, 
            height: outerboxRadius * 2 + innerSize
          }, 
          {
            top: borders.top ? -outerboxRadius : undefined, 
            right: borders.right ? -outerboxRadius : undefined, 
            bottom: borders.bottom ? -outerboxRadius : undefined, 
            left: borders.left ? -outerboxRadius : undefined
          }]} {...pressableProps}></Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerbox: {
    position: 'absolute',
  },
});

