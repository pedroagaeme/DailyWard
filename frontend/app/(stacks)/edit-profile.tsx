import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ScreenHeader } from '@/components/ScreenHeader';
import { CustomProfileImage } from '@/components/CustomImage';
import { FormInput } from '@/components/FormInput';
import { ApiInterfacingButton } from '@/components/ApiInterfacingButton';
import { useUserProfile } from '@/hooks/useUserProfile';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { UploadImageIcon } from '@/assets/images/upload-image-icon';

interface EditProfileForm {
  firstName: string;
  lastName: string;
}

export default function EditProfileScreen() {
  const { profile, updateProfileAsync, isUpdating } = useUserProfile();
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);
  const [image, setImage] = useState<string | null>(null);
  
  const { control, handleSubmit, formState: { errors }, reset } = useForm<EditProfileForm>({
    defaultValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
    }
  });

  useEffect(() => {
    if (profile) {
      reset({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
      });
      setImage(profile.profilePicUrl);
    }
  }, [profile]);

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

  const onSubmit = async (data: EditProfileForm) => {
    try {
      await updateProfileAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        profilePicUrl: image !== profile?.profilePicUrl ? image : undefined,
      });
      router.back();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil');
    }
  };

  const fullName = `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || 'Usuário';

  return (
    <View style={styles.container}>
      <ScreenHeader title="Editar Perfil" />
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        style={styles.content}
        contentContainerStyle={[styles.contentContainer, { paddingBottom: insets.bottom + 20 }]}
      >
        <View style={styles.profileSection}>
          <CustomProfileImage
            source={image}
            fullName={fullName}
            style={styles.profilePicture}
            expandable={false}
          />
          
          <Pressable onPress={pickImage} style={styles.changePhotoButton}>
            <UploadImageIcon width={20} height={20} color={Colors.light.primary} />
            <Text style={styles.changePhotoText}>Alterar Foto</Text>
          </Pressable>
        </View>

        <Controller
          control={control}
          name="firstName"
          rules={{ required: 'Nome é obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              title="Nome"
              placeholder="Digite seu nome"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              autoCapitalize="words"
              errors={errors.firstName}
              parentScrollRef={scrollViewRef}
            />
          )}
        />

        <Controller
          control={control}
          name="lastName"
          rules={{ required: 'Sobrenome é obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              title="Sobrenome"
              placeholder="Digite seu sobrenome"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              autoCapitalize="words"
              errors={errors.lastName}
              parentScrollRef={scrollViewRef}
            />
          )}
        />

        <ApiInterfacingButton
          label="Salvar Alterações"
          onPress={handleSubmit(onSubmit)}
          isLoading={isUpdating}
          style={styles.saveButton}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background[100],
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  changePhotoText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.light.primary,
  },
  saveButton: {
    marginTop: 20,
  },
});
