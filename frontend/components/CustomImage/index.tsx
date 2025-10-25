import React, { useState} from 'react';
import { View, StyleSheet, Pressable, Modal, Dimensions, StatusBar } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { DefaultProfileIcon } from './components/DefaultProfileIcon';
import { CustomImageProps, CustomProfileImageProps } from '@/types';
import { Colors } from '@/constants/Colors';
import { Zoomable } from '@likashefqet/react-native-image-zoom';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';

export function CustomImage({
  source,
  fallbackSource,
  containerStyle,
  showOverlay = true,
  overlayStyle,
  expandable = true,
  ...imageProps
}: CustomImageProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  
  const imageSource: FastImageProps['source'] = (source ? { 
    uri: source, 
    cache: FastImage.cacheControl.immutable,
  } : fallbackSource)
  const imageStyle = imageProps.style as any;
  const borderRadius = imageStyle?.borderRadius || containerStyle?.borderRadius || 0;

  const handleImagePress = () => {
    if (expandable && source) {
      setModalVisible(true);
    }
  };


  return (
    <>
      <View style={[containerStyle, !source && { pointerEvents: 'none' }]}>
        {expandable && source ? (
          <Pressable onPress={handleImagePress} style={{ flex: 1 }}>
            <FastImage source={imageSource} {...imageProps} />
            {showOverlay && (
              <View style={[styles.overlay, { borderRadius }, overlayStyle, styles.overlayPressable]} />
            )}
          </Pressable>
        ) : (
          <>
            <FastImage source={imageSource} {...imageProps} />
            {showOverlay && (
              <View style={[styles.overlay, { borderRadius }, overlayStyle]} />
            )}
          </>
        )}
      </View>

      {expandable && source && (
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          animationType="fade"
          statusBarTranslucent={true}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" animated={true} />
            <Pressable 
              onPress={() => setModalVisible(false)} 
              style={[styles.backButton, { top: insets.top + 16, left: 16 }]}
            >
              <GoBackIcon width={32} height={32} color="#FFFFFF" />
            </Pressable>
            <Pressable 
              style={styles.zoomModalContainer}
              onPress={() => setModalVisible(false)}
            >
              <Pressable onPress={(e) => e.stopPropagation()}>
                <Zoomable
                  minScale={1}
                  maxScale={3}

                >
                  <FastImage 
                    source={imageSource} 
                    style={styles.zoomImage}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </Zoomable>
              </Pressable>
            </Pressable>
          </GestureHandlerRootView>
        </Modal>
      )}
    </>
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
        {showOverlay && (
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
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.2) inset',
    borderRadius: 16,
  },
  overlayPressable: {
    pointerEvents: 'none',
  },
  imageModalContent: {
    backgroundColor: Colors.light.background[100],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedImageContainer: {
    position: 'relative',
    width: '100%',
    borderRadius: 16,
  },
  expandedImage: {
    borderRadius: 16,
    width: '100%',
    height: undefined,
    resizeMode: 'cover',
  },
  zoomModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomImage: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  backButton: {
    position: 'absolute',
    zIndex: 10,
    padding: 8,
  },
});
