import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { router } from 'expo-router';
import { AuthService } from '@/services/authService';
import { FormInput } from '@/components/FormInput';
import { ApiInterfacingButton } from '@/components/ApiInterfacingButton';

interface VerifyEmailForm {
  otp: string;
}

export default function VerifyEmail() {
  const { control, handleSubmit, formState: { errors } } = useForm<VerifyEmailForm>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: VerifyEmailForm) => {
    setIsLoading(true);
    const otpCode = data.otp.trim();
    
    if (otpCode.length !== 6) {
      Alert.alert('Erro', 'Por favor, insira o código de 6 dígitos');
      setIsLoading(false);
      return;
    }

    const result = await AuthService.verifyEmail(otpCode);
    
    if (result?.error) {
      Alert.alert('Erro', 'Código inválido. Por favor, tente novamente.');
      setIsLoading(false);
    } else {
      // Email Verified Successfully, proceed to next step
      router.dismissAll();
      router.replace('/login');
      router.push('/register/add-picture');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top', 'left', 'right']}>
        <Text style={styles.title}>Verifique seu email</Text>
        <Text style={styles.text}>
          Digite o código de 6 dígitos que enviamos para o seu email.
        </Text>
      </SafeAreaView>
      <View style={styles.form}>
        <Controller
          name="otp"
          control={control}
          rules={{
            required: 'Código é obrigatório',
            minLength: { value: 6, message: 'Código deve ter 6 dígitos' },
            maxLength: { value: 6, message: 'Código deve ter 6 dígitos' },
            pattern: { value: /^[0-9]+$/, message: 'Código deve conter apenas números' }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              title="Código de Verificação"
              value={value || ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Digite o código de 6 dígitos"
              keyboardType="number-pad"
              maxLength={6}
              autoFocus
              errors={errors.otp}
            />
          )}
        />
        <ApiInterfacingButton 
          style={styles.button} 
          onPress={handleSubmit(onSubmit)}
          label="Verificar"
          isLoading={isLoading}
        />
        <View style={styles.row}>
          <Text style={styles.text}>Não recebeu o código? </Text>
          <Pressable onPress={() => Alert.alert('Info', 'Por favor, verifique sua caixa de entrada e spam.')}>
            <Text style={styles.link}>Reenviar</Text>
          </Pressable>
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
    gap: 12,
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
  text: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.light.text[30],
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
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
  link: {
    color: Colors.light.primary,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 18,
  },
});

