import { SvgProps } from "react-native-svg";
import * as React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { TabTriggerSlotProps } from "expo-router/ui";

interface CustomTabButtonProps extends React.PropsWithChildren, TabTriggerSlotProps {
	Icon: ((props:SvgProps) => React.JSX.Element);
}

export const CustomTabButton = React.forwardRef<View, CustomTabButtonProps>(
	({Icon, ...props}, ref) => {
		return (
			<Pressable
				ref={ref}
				{...props}
				style={[styles.button, props.isFocused && styles.focusedButton]}
			>
				<Icon width={32} height={32} />
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
    },
	focusedButton: {
		opacity:1,
	},
	focusedText: {
		opacity:1,
	}
});