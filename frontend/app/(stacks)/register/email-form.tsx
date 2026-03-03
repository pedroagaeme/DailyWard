import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Colors } from '@/constants/Colors';
import { Controller, useForm } from 'react-hook-form';
import { FormInput } from '@/components/FormInput';
import { Link, router } from 'expo-router';
import { RegisterFormData } from '@/types';
import { useRegisterForm } from '@/contexts';
import { useAuth } from '@/contexts';
import { ApiInterfacingButton } from '@/components/ApiInterfacingButton';
import { useState } from 'react';

export default function EmailScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
    const insets = useSafeAreaInsets();
    const { onRegister } = useAuth();
    const { updateFormData, getFormData} = useRegisterForm();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        updateFormData!(data);
        const formData = getFormData!();
        const result = await onRegister!({ ...formData, ...data });
        if (!result?.error) {
            router.push({pathname: '/register/verify-email'});
        }
        else {
            console.error(result.error);
        }
        setIsLoading(false);
    };

    return (
        <KeyboardAwareScrollView 
            style={[styles.container, { marginTop: insets.top, marginBottom: insets.bottom }]}
            contentContainerStyle={styles.scrollContent}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={20 + insets.bottom}
        >
            <SafeAreaView style={styles.header} edges={['top', 'left', 'right']}>
                <Text style={styles.title}>Insira seu email</Text>
                <Text style={styles.text}>Enviaremos um código de verificação de 6 dígitos para o seu endereço de email.</Text>
            </SafeAreaView>
            <View style={styles.form}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInput
                            title='Email'
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            errors={errors.email}
                            returnKeyType="done"
                            submitBehavior='blurAndSubmit'
                        />
                    )}
                    rules={{
                        required: 'Email é obrigatório',
                    }}
                />
                <ApiInterfacingButton 
                    style={styles.button} 
                    onPress={handleSubmit(onSubmit)}
                    label="Enviar Código"
                    isLoading={isLoading}
                />
                <View style={styles.row}>
                    <Text style={styles.text}>Já tem uma conta? </Text>
                    <Link href="/" style={styles.link} replace>
                        Entrar.
                    </Link>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background[90],
    },
    scrollContent: {
        alignItems: 'center',
    },
    header: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
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
