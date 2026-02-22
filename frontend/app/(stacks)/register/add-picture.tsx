import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { CustomImage } from '@/components/CustomImage';
import { UploadImageIcon } from '@/assets/images/upload-image-icon';
import { useRegisterForm } from '@/contexts';
import { ProfileService } from '@/services/profileService';
import { useAuth } from '@/contexts';

export default function AddPicture() {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getFormData } = useRegisterForm();
  const { onLogin } = useAuth();

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao selecionar imagem');
    }
  };

  const handleSkip = async () => {
    // Pular e fazer login
    const formData = getFormData!();
    if (formData.email && formData.password) {
      const result = await onLogin!({
        email: formData.email,
        password: formData.password,
      });
      if (!result?.error) {
        router.replace('/(stacks)/topics');
      }
    }
  };

  const handleContinue = async () => {
    setIsLoading(true);
    const formData = getFormData!();
    
    try {
      // Fazer login primeiro
      if (formData.email && formData.password) {
        const result = await onLogin!({
          email: formData.email,
          password: formData.password,
        });
        
        if (result?.error) {
          Alert.alert('Erro', 'Falha ao fazer login. Tente novamente.');
          setIsLoading(false);
          return;
        }

        // Se houver imagem, atualizar perfil após login
        if (image) {
          try {
            await ProfileService.updateProfile({
              profilePicUrl: image,
            });
          } catch (error) {
            console.error('Error updating profile:', error);
            // Não bloquear o fluxo se falhar ao atualizar foto
          }
        }

        router.replace('/(stacks)/topics');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao finalizar cadastro. Tente novamente.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header} edges={['top', 'left', 'right']}>
        <Text style={styles.title}>Adicione uma foto de perfil</Text>
        <Text style={styles.text}>
          Adicione uma foto para que outros usuários possam te reconhecer. Você pode pular esta etapa e adicionar depois.
        </Text>
      </SafeAreaView>
      <View style={styles.form}>
        <Pressable 
          style={[styles.uploadArea, image && styles.uploadAreaWithImage]} 
          onPress={pickImage}
        >
          {image ? (
            <CustomImage source={image} style={styles.previewImage} />
          ) : (
            <View style={styles.uploadContent}>
              <UploadImageIcon width={40} height={40} color={Colors.light.primary} />
              <Text style={styles.uploadCta}>Clique para fazer upload</Text>
              <Text style={styles.uploadHint}>SVG, PNG, JPG ou GIF</Text>
            </View>
          )}
        </Pressable>

        {image && (
          <Pressable style={styles.changeImageButton} onPress={pickImage}>
            <Text style={styles.changeImageText}>Trocar imagem</Text>
          </Pressable>
        )}

        <Pressable 
          style={[styles.button, isLoading && styles.buttonDisabled]} 
          onPress={handleContinue}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Finalizando...' : 'Continuar'}
          </Text>
        </Pressable>

        <Pressable 
          style={styles.skipButton} 
          onPress={handleSkip}
          disabled={isLoading}
        >
          <Text style={styles.skipButtonText}>Pular</Text>
        </Pressable>
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
  uploadArea: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: Colors.light.background[70],
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    aspectRatio: 1,
    width: '100%',
    backgroundColor: Colors.light.background[100],
  },
  uploadAreaWithImage: {
    padding: 0,
    aspectRatio: 1,
    width: '100%',
    borderStyle: 'solid',
  },
  uploadContent: {
    alignItems: 'center',
    gap: 8,
  },
  uploadCta: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: Colors.light.text[5],
    marginTop: 8,
  },
  uploadHint: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: Colors.light.text[30],
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  changeImageButton: {
    marginTop: -16,
    marginBottom: 24,
    alignItems: 'center',
  },
  changeImageText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.light.primary,
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
  skipButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.light.text[30],
  },
});

