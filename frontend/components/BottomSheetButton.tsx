import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { BottomSheetCloseContext } from './BottomSheetModal';

interface BottomSheetButtonProps {
  onPress: () => void;
  label: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  isDestructive?: boolean;
}

export function BottomSheetButton({ 
  onPress, 
  label, 
  style, 
  textStyle,
  isDestructive = false 
}: BottomSheetButtonProps) {
  const closeModal = useContext(BottomSheetCloseContext);
  
  const handlePress = () => {
    closeModal(onPress);
  };

  return (
    <Pressable 
      onPress={handlePress} 
      style={[styles.button, style]}
    >
      <Text style={[
        styles.buttonText, 
        isDestructive && styles.destructiveText,
        textStyle
      ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.light.text[5],
    textAlign: 'left',
  },
  destructiveText: {
    color: '#FF3B30',
  },
});

