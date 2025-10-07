import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import { Colors } from '@/constants/Colors';
import { FieldError } from 'react-hook-form';


export function FormInput({title, ref, errors, borderless = false, ...props}: {
    title?: string, 
    ref?: React.Ref<TextInput>, 
    errors?:FieldError,
    borderless?:boolean
    } & TextInputProps) {
    return(
        <View style={styles.formContainer}>
            {title && <Text style={styles.label}>{title}</Text>}
            <View style={[styles.inputFieldContainer, borderless ? { borderWidth: 0, paddingHorizontal: 0} : {borderWidth: 1}]}>
                <TextInput
                    {...props}
                    ref={ref}
                    style={styles.input}
                    underlineColorAndroid={'transparent'}
                />
            </View>
            {errors && <Text style={styles.errorText}>{errors.message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        marginBottom: 20,
        gap: 8,
    },
    label: {
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        color: Colors.light.text[5],
    },
    inputFieldContainer: {
        borderColor: Colors.light.background[90],
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: Colors.light.background[100],
    },
    input: {
        fontSize: 16,
        lineHeight: 24,
        color: Colors.light.text[5],
    },
    errorText: {
        fontFamily: 'Inter_400Regular',
        color: Colors.light.error,
        fontSize: 14,
    },
    
});