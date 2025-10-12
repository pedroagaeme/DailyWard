import {View, Text, TextInput, StyleSheet, TextInputProps, ScrollView} from 'react-native';
import { Colors } from '@/constants/Colors';
import { FieldError } from 'react-hook-form';


export function FormInput({title, ref, errors, borderless = false, additionalElements = [], ...props}: {
    title?: string, 
    ref?: React.Ref<TextInput>, 
    errors?:FieldError,
    borderless?:boolean
    additionalElements?: React.ReactNode[]
    } & TextInputProps) {
    return(
        <View style={[styles.formContainer, borderless && {marginBottom:0, flex:1}]}>
            {title && <Text style={styles.label}>{title}</Text>}
            <ScrollView 
                style={[
                    styles.inputFieldContainer, borderless ? 
                        { borderWidth: 0, paddingHorizontal: 0} : 
                        {borderWidth: 0.5}
                ]}
                showsVerticalScrollIndicator={false}
            >
                <TextInput
                    {...props}
                    ref={ref}
                    style={styles.input}
                    underlineColorAndroid={'transparent'}
                />
                {additionalElements}
            </ScrollView>
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
        borderColor: Colors.light.background[70],
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