import {View, Text, TextInput, StyleSheet, TextInputProps, ScrollView} from 'react-native';
import { Colors } from '@/constants/Colors';
import { FieldError } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const lineHeight = 24;
const minInputHeight = 45;

type FormInputProps = {
    title?: string;
    ref?: React.Ref<TextInput>;
    errors?: FieldError;
    borderless?: boolean;
    headerComponent?: React.ReactNode;
    footerComponent?: React.ReactNode;
    parentScrollRef?: React.RefObject<KeyboardAwareScrollView> | null;
} & TextInputProps;

export function FormInput({title, ref, errors, borderless = false, headerComponent, footerComponent, parentScrollRef, ...props}: FormInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [inputHeight, setInputHeight] = useState(minInputHeight);
    const initialValue = props.value || props.defaultValue || '';
    const [isTextEmpty, setIsTextEmpty] = useState(initialValue.length === 0);
    const errorMessageRef = useRef<View>(null);
    const [errorY, setErrorY] = useState(0);

    useEffect(() => {
        const currentValue = props.value || props.defaultValue || '';
        setIsTextEmpty(currentValue.length === 0);
    }, [props.value, props.defaultValue]);

    useEffect(() => {
        if (errors && parentScrollRef?.current) {
            parentScrollRef.current?.scrollToPosition(0, errorY, true);
        }
    }, [errors, errorY]);

    return(
        <View style={[styles.formContainer, borderless && {marginBottom:0, flex:1}]}>
            {title && <Text style={styles.label}>{title}</Text>}
            <ScrollView 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={borderless ? {paddingVertical: 16} : {}}
            >   
                {headerComponent}
                <View style={[
                    borderless ? styles.borderlessInputFieldContainer : styles.inputFieldContainer,
                    {height: inputHeight + 8},
                    isFocused && !borderless && { borderColor: Colors.light.primary }
                ]}>
                    <TextInput
                        {...props}
                        ref={ref}
                        style={[styles.input, {minHeight: Math.max(inputHeight, lineHeight) + lineHeight}]}
                        underlineColorAndroid={'transparent'}
                        placeholderTextColor={Colors.light.text[30]}
                        cursorColor={Colors.light.primary}
                        onFocus={(e) => {
                            setIsFocused(true);
                            props.onFocus?.(e);
                        }}
                        onBlur={(e) => {
                            setIsFocused(false);
                            props.onBlur?.(e);
                        }}
                        onContentSizeChange={(e) => {
                            if (isTextEmpty) {
                                setInputHeight(minInputHeight);
                            } else {
                                setInputHeight(Math.max(e.nativeEvent.contentSize.height, minInputHeight));
                            }
                        }}
                        onChangeText={(text) => {
                            setIsTextEmpty(text.length === 0);
                            props.onChangeText?.(text);
                        }}
                    />
                </View>
                {footerComponent}
            </ScrollView>
            {errors && (
                <View 
                    ref={errorMessageRef}
                    onLayout={(event) => {
                        errorMessageRef.current?.measureInWindow((x, y) => {
                            setErrorY(y);
                        });
                    }}
                >
                    <Text style={styles.errorText}>{errors.message}</Text>
                </View>
            )}
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
        borderColor: Colors.light.background[70],
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: Colors.light.background[95],
    },
    borderlessInputFieldContainer: {
        paddingVertical: 4,
        paddingHorizontal: 0,
        backgroundColor: 'transparent',
    },
    input: {
        fontSize: 16,
        lineHeight: lineHeight,
        color: Colors.light.text[5],
        textAlignVertical: 'top',
    },
    errorText: {
        fontFamily: 'Inter_400Regular',
        color: Colors.light.error,
        fontSize: 14,
    },
    
});