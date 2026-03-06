import { View, Text, StyleSheet, TextInput, Pressable, Alert} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { useForm, Controller } from 'react-hook-form';
import { useRef, useState } from 'react';
import { FormInput } from '@/components/FormInput';
import { LoginFormData } from '@/types';
import { Link } from 'expo-router';
import { useAuth } from '@/contexts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DailyWardLogo } from '@/assets/images/dailyward-logo';
import { ApiInterfacingButton } from '@/components/ApiInterfacingButton';

export default function Login() {
    const { control, handleSubmit, formState: {errors} } = useForm<LoginFormData>();
    const insets = useSafeAreaInsets();
    const passwordRef = useRef<TextInput>(null);
    const { onLogin, authState } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        const result = await onLogin!(data);
        if(result && result.error) {
            const errorStatus = result.error?.response?.status;
            const errorMessage = result.error?.response?.data?.detail;
            
            if (errorStatus === 401) {
                // Display the specific error message from backend
                Alert.alert('Erro', errorMessage || 'Email ou senha inválidos');
            } else if (errorStatus === 400) {
                Alert.alert('Erro', errorMessage || 'Dados inválidos');
            } else {
                Alert.alert('Erro', 'Ocorreu um erro inesperado');
            }
        }
        setIsLoading(false);
    };

    return(
        <KeyboardAwareScrollView 
            style={[styles.container, { marginTop: insets.top, marginBottom: insets.bottom }]}
            contentContainerStyle={styles.scrollContent}
            enableOnAndroid={true}
            enableAutomaticScroll={true}
            keyboardShouldPersistTaps="handled"
            extraScrollHeight={20 + insets.bottom}
        >
            <SafeAreaView style={styles.header} edges={['top', 'left', 'right']}>
                <View style={styles.logoBox}>
                    <DailyWardLogo width={52} height={52} color={Colors.light.background[95]} />
                </View>
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
                <ApiInterfacingButton 
                    style={styles.button} 
                    onPress={handleSubmit(onSubmit)}
                    label="Entrar"
                    isLoading={isLoading}
                />
                <View style={styles.row}>
                    <Text style={styles.text}>Ainda não tem uma conta? </Text>
                    <Link href="/register" style={styles.link} replace>
                        Cadastre-se.
                    </Link>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
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
        alignItems: 'flex-start',
        gap: 16,
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 4,
        paddingBottom: 24
    },
    form: {
        width: '100%',
        paddingHorizontal: 20,
    },
    logoBox: {
        padding: 4,
        backgroundColor: Colors.light.primary,
        borderRadius: 16,
    },
    title: {
        fontFamily: 'Inter_600SemiBold',
        letterSpacing: 0,
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

