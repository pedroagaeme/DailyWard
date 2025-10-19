import React from 'react';
import { View, StyleSheet, ImageProps, ViewStyle } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { DefaultProfileIcon } from './components/DefaultProfileIcon';
import { CustomImageViewProps, CustomImageProps, CustomProfileImageProps } from '@/types';

export function CustomImage({
  source,
  fallbackSource,
  containerStyle,
  showOverlay = true,
  overlayStyle,
  ...imageProps
}: CustomImageProps) {
  const imageSource = (source ? { uri: source, cache: FastImage.cacheControl.immutable} : fallbackSource)
  const imageStyle = imageProps.style as any;
  const borderRadius = imageStyle?.borderRadius || containerStyle?.borderRadius || undefined;

  return (
    <View style={containerStyle}>
      <FastImage source={imageSource} {...imageProps} />
      {showOverlay && borderRadius && (
        <View style={[styles.overlay, { borderRadius }, overlayStyle]} />
      )}
    </View>
  );
}


export function CustomProfileImage({
  source,
  fullName,
  containerStyle,
  showOverlay = true,
  overlayStyle,
  ...imageProps
}: CustomProfileImageProps) {
  // If no source, show DefaultProfileIcon
  if (!source) {
    const imageStyle = imageProps.style as any;
    const borderRadius = imageStyle?.borderRadius || containerStyle?.borderRadius || 0;
    
    return (
      <View style={containerStyle}>
        <DefaultProfileIcon 
          fullName={fullName} 
          viewStyleProps={imageStyle}
        />
        {showOverlay && borderRadius && (
          <View style={[styles.overlay, { borderRadius }, overlayStyle]} />
        )}
      </View>
    );
  }

  // Use CustomImage for actual images
  return (
    <CustomImage
      source={source}
      containerStyle={containerStyle}
      showOverlay={showOverlay}
      overlayStyle={overlayStyle}
      {...imageProps}
    />
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxShadow: '0 -1px 4px rgba(0, 0, 0, 0.1) inset',
  },
});
