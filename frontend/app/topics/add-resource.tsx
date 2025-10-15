import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import * as DocumentPicker from 'expo-document-picker';
import { FormInput } from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { axiosPrivate } from '@/utils/api';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTopics } from '@/utils/topicsContext';

interface CreateResourceForm {
  title: string;
  description: string;
}

export default function AddResource() {
  const { topicState } = useTopics();
  const { control, handleSubmit } = useForm<CreateResourceForm>();
  const insets = useSafeAreaInsets();
  const [file, setFile] = useState<any>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        setFile(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const onSubmit = async (data: CreateResourceForm) => {
    try {
      const form = new FormData();
      form.append('title', data.title);
      form.append('description', data.description);
      
      if (file) {
        form.append('resourceType', 'file');
        form.append('fileUrl', {
          uri: file.uri,
          name: file.name,
          type: file.mimeType,
        } as any);
        form.append('filename', file.name);
      } else {
        form.append('resourceType', 'announcement');
      }
      
      await axiosPrivate.post(`/users/me/topics/${topicState?.id}/resources/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      router.back();
    } catch (error: any) {
      console.error('Error creating resource:', error);
      Alert.alert('Error', 'Failed to create resource');
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true} style={styles.body} contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <GoBackIcon width={24} height={24} color={Colors.light.text[5]} />
          </Pressable>
          <Text style={styles.sectionTitle}>Adicionar Recurso</Text>
          <View style={{ width: 24, height: 24 }} />
        </View>

        <Controller
          control={control}
          name="title"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              title="Título"
              placeholder="Dê um título ao recurso"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              autoCapitalize="sentences"
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{ maxLength: 200 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              title="Descrição"
              placeholder="Conte-nos mais sobre o seu recurso"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              multiline
              numberOfLines={4}
              maxLength={200}
            />
          )}
        />

        <View style={styles.fileUploadBlock}>
          <Text style={styles.label}>Arquivo</Text>
          <Pressable style={styles.uploadArea} onPress={pickDocument}>
            {file ? (
              <View style={styles.fileInfo}>
                <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
                <Text style={styles.fileSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</Text>
              </View>
            ) : (
              <View style={styles.uploadContent}>
                <Text style={styles.uploadCta}>Clique para fazer upload</Text>
                <Text style={styles.uploadHint}>Qualquer tipo de arquivo</Text>
              </View>
            )}
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Pressable onPress={handleSubmit(onSubmit)} style={styles.button}>
            <Text style={styles.buttonText}>Enviar</Text>
          </Pressable>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background[90],
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: -0.2,
    fontSize: 20,
    lineHeight: 24,
    color: Colors.light.text[5],
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    marginBottom: 16,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: Colors.light.text[5],
  },
  fileUploadBlock: {
    gap: 8,
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
    height: 120,
  },
  uploadContent: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  uploadCta: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.light.text[5],
  },
  uploadHint: {
    fontFamily: 'Inter_400Regular',
    color: Colors.light.text[30],
    fontSize: 12,
  },
  fileInfo: {
    alignItems: 'center',
    gap: 4,
  },
  fileName: {
    fontFamily: 'Inter_600SemiBold',
    color: Colors.light.text[5],
    fontSize: 14,
  },
  fileSize: {
    fontFamily: 'Inter_400Regular',
    color: Colors.light.text[30],
    fontSize: 12,
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 8,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  buttonText: {
    fontFamily: 'Inter_500Medium',
    color: Colors.light.background[100],
    fontSize: 18,
    lineHeight: 28,
  },
});
