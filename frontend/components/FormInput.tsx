import {View, Text, TextInput, StyleSheet, TextInputProps} from 'react-native';
import { Colors } from '@/constants/Colors';
import { FieldError } from 'react-hook-form';


export function FormInput({title, ref, errors, ...props}: {title?: string, ref?: React.Ref<TextInput>, errors?:FieldError} & TextInputProps) {
    return(
        <View style={styles.formContainer}>
            <Text style={styles.label}>{title || props.placeholder}</Text>
            <View style={styles.inputFieldContainer}>
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
        borderWidth: 1,
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