import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

export default function Resources() {
    return (
    <View style={styles.container}>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'space-between',
        backgroundColor: Colors.light.background, 
        overflow: 'visible'
    },
});