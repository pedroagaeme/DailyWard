import { SendIcon } from "@/assets/images/send-icon";
import { Pressable, StyleSheet, Text, PressableProps } from "react-native";
import { Colors } from "@/constants/Colors";


export function SendPostButton(props: PressableProps) {
    return (
        <Pressable style={styles.sendButton} {...props}>
            <Text style={styles.buttonText}>Enviar</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    sendButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 40,
        backgroundColor: Colors.light.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    buttonText: {
        fontFamily:'Inter_600SemiBold',
        letterSpacing: 0.5,
        fontSize: 16,
        lineHeight: 24,
        color: '#ffffff',
    },
});