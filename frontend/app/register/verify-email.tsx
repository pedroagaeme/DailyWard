import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Controller, useForm } from 'react-hook-form';
import { OtpInputField } from '@/components/OtpInputField';
import { axiosPrivate } from '@/utils/api';
import { useAuth } from '@/utils/authContext';
import { useRegisterForm } from '@/utils/registerFormContext';
import { useState } from 'react';

type VerifyEmailFormData = {
	otp: string;
};

export default function VerifyEmail() {
	const { control, handleSubmit, formState: { errors } } = useForm<VerifyEmailFormData>();
	const { updateFormData, getFormData } = useRegisterForm();
	const [formData, setFormData] = useState(getFormData!());
    const { onLogin } = useAuth();


	const onSubmit = async (data: VerifyEmailFormData) => {
		try {
            const response = await axiosPrivate.post('/auth/verify-email/', data);
            if (response.status === 200) {
                onLogin!({email: formData.email, password: formData.password});
            }
        }
        catch (error) {
            console.error('Error verifying email:', error);
        }
	};

	return (
		<View style={styles.container}>
			<SafeAreaView style={styles.header} edges={['top', 'left', 'right']}>
				<Text style={styles.title}>Verifique seu email</Text>
				<Text style={styles.text}>Digite o código que enviamos para seu endereço de email {formData.email}.</Text>
			</SafeAreaView>
			<View style={styles.form}>
				<Controller
					name="otp"
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<OtpInputField
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            length={6}
                        />
					)}
					rules={{
						required: 'O código é obrigatório',
					}}
				/>
				<Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
					<Text style={styles.buttonText}>Verificar</Text>
				</Pressable>
				<View style={styles.row}>
					<Text style={styles.text}>Não recebeu o código? </Text>
					<Pressable>
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
