import { AddIcon } from "@/assets/images/add-icon";
import { Colors } from "@/constants/Colors";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

export function CreateTopicButton(props: PressableProps) {
    return (
        <Pressable style={styles.button} {...props}>
            <Text style={styles.buttonText}>Enviar</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: Colors.light.primary,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
    },
    buttonText: {
        fontFamily: 'Inter_500Medium',
        color: Colors.light.background[100],
        fontSize: 18,
        lineHeight: 28,
    },
});


