import { AddIcon } from "@/assets/images/add-icon";
import { Colors } from "@/constants/Colors";
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from "react-native";

export function GoToCreateTopicButton() {
    const handlePress = () => {
        router.push('/topics/create-topic');
    };
    return (
        <Pressable style={styles.button} onPress={handlePress}>
            <AddIcon width={28} height={28} />
            <Text style={styles.buttonText}>Criar</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        backgroundColor: Colors.light.primary,
        paddingVertical: 8,
        paddingRight: 20,
        paddingLeft: 16,
        gap: 4,
        borderRadius: 24,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Inter_500Medium',
        color: Colors.light.background[100],
        fontSize: 16,
        lineHeight: 28,
    },
});