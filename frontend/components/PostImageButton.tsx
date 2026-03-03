import { AddImageToPostIcon } from "@/assets/images/add-image-to-post";
import { RemoveImageIcon } from "@/assets/images/remove-image-icon";
import React, { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, TextInput, useWindowDimensions } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { IconButton } from '@/components/IconButton';
import { useAnimatedKeyboard, useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";

type PostImageButtonMode = 'add' | 'remove';

interface PostImageButtonProps {
    mode: PostImageButtonMode;
    setImage: (uri: string | null) => void;
    inputRef?: React.RefObject<TextInput | null> | null;
}

export function PostImageButton({ mode, setImage, inputRef }: PostImageButtonProps) {
    const [shouldOpenPicker, setShouldOpenPicker] = useState(false);
    const keyboard = useAnimatedKeyboard();

    const openImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        setShouldOpenPicker(false);
    }

    useAnimatedReaction(() => {
        return keyboard.height.value;
    }, (height) => {
        if(height === 0 && shouldOpenPicker) {
            scheduleOnRN(openImagePicker);
        }
    }, [shouldOpenPicker]);

    const handleButtonPress = async () => {
        if (mode === 'remove') {
            setImage(null);
            inputRef?.current?.blur();
        } else {
            setShouldOpenPicker(true);
            inputRef?.current?.blur();
        }
    };

    return (
        <IconButton onPress={handleButtonPress}>
            {mode === 'add' ? (
                <AddImageToPostIcon width={24} height={24} />
            ) : (
                <RemoveImageIcon width={24} height={24} />
            )}
        </IconButton>
    );
}

const styles = StyleSheet.create({});
