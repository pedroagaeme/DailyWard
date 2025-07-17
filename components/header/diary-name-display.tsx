import { EditIcon } from "@/assets/images/header-icons/edit-icon";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

interface DisplayProps {
    name?: string;
};

export function DiaryNameDisplay(props: DisplayProps) {
    return(
    <View style={styles.frame}>
        <Text style={styles.text}>{props.name ? <Text >{props.name}</Text> : <Text>Todos os diários</Text>}</Text>
        <EditIcon/>
    </View>
    );
};

const styles = StyleSheet.create({
    frame: {
        gap:10,
        flexDirection:'row',
        alignItems:'center',
        minWidth:'30%',
        borderWidth:1,
        paddingVertical:5,
        paddingHorizontal:20,
        borderRadius:10,
        borderColor: Colors.neutral[100],
    },
    text: {
        fontFamily: 'Inter_500Medium',
        fontSize:20,
        color: Colors.neutral[100],
    }
});