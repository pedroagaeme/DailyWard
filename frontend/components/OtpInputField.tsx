import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRef, useState } from 'react';

interface OtpInputFieldProps {
    value: string;
    length: number;
    onChange: (text: string) => void;
    errors?: string[];
    onBlur?: () => void;
}

export function OtpInputField({ value = '', length, onChange, errors, onBlur }: OtpInputFieldProps) {
   
    const inputRefs = Array.from({ length }, () => useRef<TextInput>(null));
    const [focusedIndex, setFocusedIndex] = useState<number>(0);
    const [cursorPositions, setCursorPositions] = useState<number[]>(Array(length).fill(1));

    const handleCellChange = (text: string, index: number) => {
        if (!text) {
            const arr = value.split('');
            arr[index] = '';
            onChange(arr.join(''));
            return;
        }
        const digit = text.charAt(0).replace(/[^0-9]/g, '');
        if (!digit) return;
        let arr = value.split('');
        arr = [
            ...arr.slice(0, index),
            digit,
            ...arr.slice(index, length - 1)
        ];
        arr = arr.slice(0, length);
        onChange(arr.join(''));
        if (index < length - 1) {
            inputRefs[index + 1].current?.focus();
            setFocusedIndex(index + 1);
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace') {
            const cursorPos = cursorPositions[index] ?? 1;
            if (cursorPos === 0 && index > 0) {
                let arr = value.split('');
                arr.splice(index - 1, 1); 
                arr.push(''); 
                arr = arr.slice(0, length);
                onChange(arr.join(''));
                inputRefs[index - 1].current?.focus();
                setFocusedIndex(index - 1);
            } else if (value[index]) {
                // Clear current cell
                const arr = value.split('');
                arr[index] = '';
                onChange(arr.join(''));
            }
            return;
        }
        if (e.nativeEvent.key.length === 1) {
            const digit = e.nativeEvent.key;
            if (!digit.match(/[0-9]/)) return; // Only allow numbers
            if (index < length - 1 && value[index] && value.length < length) {
                let writeIndex = index;
                if (cursorPositions[index] === 1) {
                    writeIndex = index + 1;
                }
                let arr = value.split('');
                arr = [
                    ...arr.slice(0, writeIndex),
                    digit,
                    ...arr.slice(writeIndex, length - 1)
                ];
            onChange(arr.join(''));
            inputRefs[index + 1].current?.focus();
            setFocusedIndex(index + 1);
            }
        }
    };

    const handleSelectionChange = (e: any, index: number) => {
        const pos = e.nativeEvent.selection.start;
        setCursorPositions((prev) => {
            const updated = [...prev];
            updated[index] = pos;
            return updated;
        });
    };

    return (
        <View style={styles.container}>
            {Array(length).fill(0).map((_, index) => (
                <TextInput
                    key={index}
                    ref={inputRefs[index]}
                    style={[styles.inputContainer, styles.input, focusedIndex === index ? styles.activeBox : null]}
                    onChangeText={(text) => handleCellChange(text, index)}
                    value={value[index] || ''}
                    maxLength={1}
                    keyboardType="numeric"
                    onFocus={() => setFocusedIndex(index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    onBlur={onBlur}
                    onSelectionChange={(e) => handleSelectionChange(e, index)}
                    placeholder='●'
                    placeholderTextColor={'#c6c6c6'}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 10,
        gap: 8,
        position: 'relative',
    },
    inputContainer: {
        flex: 1,
        maxWidth: 50,
        aspectRatio: 0.8,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: Colors.light.background[90],
        backgroundColor: Colors.light.background[100],
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    activeBox: {
        borderColor: Colors.light.primary,
    },
    input: {
        fontSize: 20,
        color: Colors.light.text[5],
        textAlign: 'center',
    },
    cursor: {
        position: 'absolute',
        bottom: 8,
        left: '50%',
        width: 2,
        height: 24,
        backgroundColor: Colors.light.primary,
        transform: [{ translateX: -1 }],
    },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        width: 1,
        height: 1,
        left: 0,
        top: 0,
    },
});