import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { AddIcon } from "@/assets/images/add-icon";

export function AddContactsButton() {
    return (
        <View style={styles.button}>
            <AddIcon />
            <Text style={styles.buttonText}>Adicionar Contato</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        alignSelf: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: Colors.light.primary,
        borderRadius: 24,
    },
    buttonText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: Colors.light.background[100],
        textAlign: 'center',
    },
})