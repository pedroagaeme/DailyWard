import { View, Text, StyleSheet,  ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

export function DefaultProfileIcon({fullName, viewStyleProps}: {fullName: string, viewStyleProps?: ViewStyle}) {
    return (
        <View style={[styles.container, viewStyleProps]}>
            <Text style={[styles.initialText, viewStyleProps?.width ? {fontSize: Number(viewStyleProps.width) / 2} : {fontSize: 20}]}>{fullName[0].toUpperCase()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 44,
        aspectRatio: 1,
        borderRadius: 22,
        backgroundColor: Colors.light.background[90],
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialText: {
        fontFamily: 'Inter_500Medium',
        color: Colors.light.text[30],
    },
});