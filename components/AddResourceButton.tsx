import { View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { AddIcon } from "@/assets/images/add-icon";

export function AddResourceButton() {
    return (
        <View style={styles.button}>
            <AddIcon  width={24} height={24} />
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.light.primary,
        borderRadius:50,
        width:40,
        aspectRatio:1,
        justifyContent:'center',
        alignItems:'center',
    }
})