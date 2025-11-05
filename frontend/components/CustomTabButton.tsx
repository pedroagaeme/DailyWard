import { SvgProps } from "react-native-svg";
import * as React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { TabTriggerSlotProps } from "expo-router/ui";
import { Colors } from "@/constants/Colors";

interface CustomTabButtonProps extends React.PropsWithChildren, TabTriggerSlotProps {
	Icon: React.ComponentType<any>;
}

export const CustomTabButton = React.forwardRef<View, CustomTabButtonProps>(
	({Icon, ...props}, ref) => {
		return (
			<Pressable
				ref={ref}
				{...props}
				style={[styles.button, props.isFocused && styles.focusedButton]}
			>
				<Icon width={24} height={24} />
				<Text style={[styles.text]}>{props.children}</Text>
			</Pressable>
		);
	}
);

const styles = StyleSheet.create({
    button: {
		flex:1,
        justifyContent:'center',
        alignItems:'center',
		opacity:0.6,
		gap: 4,
    },
	focusedButton: {
		opacity:1,
	},
	text: {
		fontFamily: 'Inter_500Medium',
		color: Colors.light.background[100],
		fontSize: 12,
		lineHeight: 16,
	},
});