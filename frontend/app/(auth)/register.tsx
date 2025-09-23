import { View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Controller, useForm } from 'react-hook-form';
import { useRef } from 'react';
import { FormInput } from '@/components/FormInput';
import { RegisterFormData, LoginFormData } from '@/constants/FormTypes';
import { Link } from 'expo-router';
import { useAuth } from '../../utils/AuthContext';

export default function Register() {
    const { control, handleSubmit, formState: {errors} } = useForm<RegisterFormData>();
    const { onRegister, onLogin } = useAuth();
    const lastNameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const confirmPasswordRef = useRef<TextInput>(null);

    const onSubmit = async (data: RegisterFormData) => {
        data
        const result = await onRegister!(data);
        if(result && result.error) {
            console.log(result.error);
        }
        else {
            onLogin!({email: data.email, password: data.password});
        }
    };

    return(
        <View style={styles.container}>
            <SafeAreaView style={styles.header} edges={['top', 'left', 'right']}>
                <Text style={styles.title}>Cadastre-se</Text>
            </SafeAreaView>
            <View style={styles.form}>
                <Controller 
                    name="firstName" 
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInput
                            placeholder="Nome"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            errors={errors.firstName}
                            returnKeyType="next"
                            onSubmitEditing={() => lastNameRef.current?.focus()}
                            submitBehavior='submit'
                        />
                    )}
                    rules={{
                        required: 'Nome é obrigatório'
                    }}
                />
                <Controller
                    name="lastName"
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInput
                            placeholder="Sobrenome"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            errors={errors.lastName}
                            returnKeyType="next"
                            onSubmitEditing={() => emailRef.current?.focus()}
                            submitBehavior='submit'
                            ref={lastNameRef}
                        />
                    )}
                    rules={{ 
                        required: 'Sobrenome é obrigatório' 
                    }}
                />
                <Controller 
                    name="email" 
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInput 
                            placeholder="Email"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            errors={errors.email}
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current?.focus()}
                            submitBehavior='submit'
                            ref={emailRef}
                        />
                    )}
                    rules={{
                        required: 'Email é obrigatório',
                    }}
                /> 
                <Controller 
                    name="password" 
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInput
                            placeholder="Senha"
                            secureTextEntry
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            errors={errors.password}
                            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                            ref={passwordRef}
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
                            placeholder="Confirmar Senha"
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
                />
                <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </Pressable>
                <View style={styles.row}>
                    <Text style={styles.text}>Já tem uma conta? </Text>
                    <Link href="/(auth)" style={styles.link} replace>
                        Entrar.
                    </Link>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.light.background[95],
    },
    header: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    form: {
        width: '100%',
        paddingHorizontal: 20,
    },
    title: {
        fontFamily: 'Inter_600SemiBold',
        letterSpacing: -0.5,
        fontSize: 32,
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
        lineHeight: 18,
        color: Colors.light.text[30],
    },
    link: {
        color: Colors.light.primary,
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 18,
    },
});