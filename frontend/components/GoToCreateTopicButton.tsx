import { Pressable, StyleSheet , Text} from "react-native";
import { Colors } from "@/constants/Colors";
import { AddIcon } from "@/assets/images/add-icon";

export function GoToCreateTopicButton() {
    return (
        <Pressable style={styles.button}>
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