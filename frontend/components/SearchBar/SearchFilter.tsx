import { StyleSheet, View, Text } from "react-native";
import { Colors } from "@/constants/Colors";

interface SearchFilterProps {
    name: string;
}

export function SearchFilter({ name }: SearchFilterProps) {
    return (
        <View style={styles.button}>
            <Text style={styles.buttonText}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light.primary,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: Colors.light.background[90],
    },
    buttonText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 14,
        color: Colors.light.background[100],
    },
});