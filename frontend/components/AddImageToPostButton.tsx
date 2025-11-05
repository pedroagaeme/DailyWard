import { AddImageToPostIcon } from "@/assets/images/add-image-to-post";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { IconButton } from '@/components/IconButton';

export function AddImageToPostButton({setImage}:{setImage:React.Dispatch<React.SetStateAction<string | null>>}) {
    const handleButtonPress = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <IconButton onPress={handleButtonPress}>
            <AddImageToPostIcon width={24} height={24} />
        </IconButton>
    );
}

const styles = StyleSheet.create({});
