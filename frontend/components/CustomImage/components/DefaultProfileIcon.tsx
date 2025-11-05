import { View, Text, StyleSheet,  ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

export function DefaultProfileIcon({fullName, viewStyleProps}: {fullName: string, viewStyleProps?: ViewStyle}) {
    // Calculate scaled values based on provided width, defaulting to 44
    const width = viewStyleProps?.width ? Number(viewStyleProps.width) : 44;
    const height = viewStyleProps?.height ? Number(viewStyleProps.height) : width;
    const borderRadius = viewStyleProps?.borderRadius ? Number(viewStyleProps.borderRadius) : width / 2;
    const fontSize = width / 2;
    
    const containerStyle = {
        width,
        height,
        borderRadius,
        backgroundColor: viewStyleProps?.backgroundColor || Colors.light.background[90],
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
    };
    
    return (
        <View style={containerStyle}>
            <Text style={[styles.initialText, { fontSize }]}>{fullName[0]?.toUpperCase()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    initialText: {
        fontFamily: 'Inter_500Medium',
        color: Colors.light.text[30],
    },
});