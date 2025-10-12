import { View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useForm, Controller } from 'react-hook-form';
import { useRef } from 'react';
import { FormInput } from '@/components/FormInput';
import { LoginFormData } from '@/constants/FormTypes';
import { Link } from 'expo-router';
import { useAuth } from '../utils/authContext';

export default function Login() {
    const { control, handleSubmit, formState: {errors} } = useForm<LoginFormData>();
    const passwordRef = useRef<TextInput>(null);
    const { onLogin, authState } = useAuth();


    const onSubmit = async (data: LoginFormData) => {
        const result = await onLogin!(data);
        if(result && result.error) {
            console.log(result.error);
            console.log((authState?.isAuthenticated === true) ? "autenticado" : "não autenticado");
        }

    };

    return(
        <View style={styles.container}>
            <SafeAreaView style={styles.header} edges={['top', 'left', 'right']}>
                <Text style={styles.title}>Entrar</Text>
            </SafeAreaView>
            <View style={styles.form}>
                <Controller 
                    name="email" 
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <FormInput
                            title='Email'
                            placeholder="Email"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordRef.current?.focus()}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            errors={errors.email}
                            submitBehavior='submit'
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
                            title='Senha'
                            placeholder="Senha"
                            secureTextEntry
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            errors={errors.password}
                            onSubmitEditing={handleSubmit(onSubmit)}
                            submitBehavior='blurAndSubmit'
                            ref={passwordRef}
                        />
                    )}
                    rules={{
                        required: 'Senha é obrigatória',
                        minLength: { value: 8, message: 'Senha deve ter no mínimo 8 caracteres' }
                    }}
                />
                <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </Pressable>
                <View style={styles.row}>
                    <Text style={styles.text}>Ainda não tem uma conta? </Text>
                    <Link href="/register" style={styles.link} replace>
                        Cadastre-se.
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

