import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { AddIcon } from "@/assets/images/add-icon";
import { IconButton } from '@/components/IconButton';

export function AddResourceButton() {
    return (
        <IconButton style={styles.button}>
            <AddIcon width={24} height={24} />
        </IconButton>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.light.primary,
        borderRadius: 22,
    }
})