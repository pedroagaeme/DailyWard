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
				<Icon/>
				<Text
					style={[styles.text, props.isFocused && styles.focusedText]}
				>
					{props.children}
				</Text>
			</Pressable>
		);
	}
);

const styles = StyleSheet.create({
    button: {
		flex:1,
        justifyContent:'center',
        alignItems:'center',
		opacity:0.4,
    },
	focusedButton: {
		opacity:1,
	},
    text: {
        fontSize:12,
        fontFamily: 'Inter_400Regular',
        color: 'white',
		opacity: 0.4,
    },
	focusedText: {
		opacity:1,
	}
});