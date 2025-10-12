import { View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Controller, useForm } from 'react-hook-form';
import { useRef } from 'react';
import { FormInput } from '@/components/FormInput';;
import { Link, router } from 'expo-router';
import { RegisterFormData } from '@/constants/FormTypes';
import { useRegisterForm } from '@/utils/registerFormContext';

export default function Register() {
    const { control, handleSubmit, formState: {errors} } = useForm<RegisterFormData>();
    const { updateFormData} = useRegisterForm();
    const lastNameRef = useRef<TextInput>(null);

    const onSubmit = async (data: RegisterFormData) => {
        updateFormData!(data);
        router.push('/register/password-form');
    };

    return(
        <View style={styles.container}>
            <SafeAreaView style={styles.header} edges={['top', 'left', 'right']}>
                <Text style={styles.title}>Qual é o seu nome?</Text>
                <Text style={styles.text}>Insira seu nome completo para se conectar com outros usuários.</Text>
            </SafeAreaView>
            <View style={styles.form}>
                <Controller 
                    name="firstName" 
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInput
                            title='Nome'
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
                            title='Sobrenome'
                            placeholder="Sobrenome"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            errors={errors.lastName}
                            returnKeyType="next"
                            onSubmitEditing={handleSubmit(onSubmit)}
                            ref={lastNameRef}
                            submitBehavior='blurAndSubmit'
                        />
                    )}
                    rules={{ 
                        required: 'Sobrenome é obrigatório' 
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