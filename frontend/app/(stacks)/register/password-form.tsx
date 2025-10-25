import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Controller, useForm } from 'react-hook-form';
import { useRef } from 'react';
import { FormInput } from '@/components/FormInput';
import { Link, router } from 'expo-router';
import { RegisterFormData } from '@/types';
import { useRegisterForm } from '@/contexts';

export default function PasswordForm() {
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
    const { updateFormData } = useRegisterForm();
    const confirmPasswordRef = useRef<TextInput>(null);

    const onSubmit = async (data: RegisterFormData) => {
        updateFormData!(data);
        router.push('/register/email-form');
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.header} edges={['top', 'left', 'right']}>
                <Text style={styles.title}>Defina sua senha</Text>
                <Text style={styles.text}>Crie uma senha de pelo menos 8 caracteres composta de letras, números e caracteres especiais.</Text>
            </SafeAreaView>
            <View style={styles.form}>
                <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInput
                            title='Senha'
                            placeholder="Senha"
                            secureTextEntry
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            errors={errors.password}
                            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                            submitBehavior='submit'
                        />
                    )}
                    rules={{
                        required: 'Senha é obrigatória',
                        minLength: { value: 8, message: 'Senha deve ter no mínimo 8 caracteres' }
                    }}
                />
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInput
                            title='Confirmar Senha'
                            placeholder="Senha"
                            secureTextEntry
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            errors={errors.confirmPassword}
                            onSubmitEditing={handleSubmit(onSubmit)}
                            ref={confirmPasswordRef}
                            submitBehavior='blurAndSubmit'
                        />
                    )}
                    rules={{
                        required: 'Confirmação de senha é obrigatória',
                        validate: (value, context) => value === context.password || 'As senhas não coincidem'
                    }}
                />
                <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </Pressable>
                <View style={styles.row}>
                    <Text style={styles.text}>Já tem uma conta? </Text>
                    <Link href="/" style={styles.link} replace>
                        Entrar.
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.light.background[90],
    },
    header: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 40,
        gap:12,
    },
    form: {
        width: '100%',
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'Inter_600SemiBold',
        letterSpacing: -0.5,
        fontSize: 28,
        lineHeight: 40,
        color: Colors.light.text[5],
    },
    button: {
        marginTop: 10,
        backgroundColor: Colors.light.primary,
        paddingVertical: 16,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Inter_600SemiBold',
        letterSpacing: 0.25,
        fontSize: 16,
        lineHeight: 20,
        color: Colors.light.background[100],
    },
    row: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    text: {
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 22,
        color: Colors.light.text[30],
    },
    link: {
        color: Colors.light.primary,
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 18,
    },
});
