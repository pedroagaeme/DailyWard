import { Text, View, StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";

export function TabButton({name, Icon}:{name:string, Icon:((props:SvgProps) => React.JSX.Element)}) {
    return (
        <View style={styles.buttonArea}>
            <Icon width={30} height={30}/>
            <Text style={styles.buttonText}>{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonArea: {
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText: {
        fontSize:12,
        fontFamily: 'Inter_400Regular',
        color: 'white',
    }
});