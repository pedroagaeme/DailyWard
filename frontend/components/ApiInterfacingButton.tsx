import React from 'react';
import { Pressable, StyleSheet, Text, ActivityIndicator, View, ViewStyle, TextStyle, PressableProps } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ApiInterfacingButtonProps extends Omit<PressableProps, 'style'> {
  onPress: () => void;
  label: string;
  isLoading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  spinnerColor?: string;
  loadingOpacity?: number;
}

export function ApiInterfacingButton({ 
  onPress, 
  label, 
  isLoading = false,
  style, 
  textStyle,
  spinnerColor = Colors.light.primary,
  loadingOpacity = 0.8,
  ...pressableProps
}: ApiInterfacingButtonProps) {
  return (
    <Pressable 
      onPress={!isLoading ? onPress : undefined} 
      style={[
        styles.button, 
        style,
        isLoading && { opacity: loadingOpacity }
      ]}
      disabled={isLoading}
      {...pressableProps}
    >
      <View style={styles.content}>
        {isLoading && (
          <ActivityIndicator 
            size="small" 
            color={spinnerColor} 
            style={styles.spinner}
          />
        )}
        <Text style={[styles.buttonText, textStyle]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: Colors.light.primary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    marginRight: 8,
  },
  buttonText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
});
