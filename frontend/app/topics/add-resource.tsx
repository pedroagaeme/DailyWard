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
import { FileCard } from '@/components/FileCard';

interface CreateResourceForm {
  title: string;
  description: string;
}

export default function AddResource() {
  const { topicState } = useTopics();
  const { control, handleSubmit } = useForm<CreateResourceForm>();
  const insets = useSafeAreaInsets();
  const [files, setFiles] = useState<any[]>([]);

  const pickDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        setFiles(prev => [...prev, ...result.assets]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick documents');
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Convert picked files to ResourceFile format for FileCard
  const convertToResourceFile = (file: any, index: number) => ({
    id: index,
    fileUrl: file.uri,
    filename: file.name,
    fileSize: file.size,
    mimeType: file.mimeType,
    created_at: new Date().toISOString(),
  });

  const onSubmit = async (data: CreateResourceForm) => {
    try {
      const form = new FormData();
      form.append('title', data.title);
      form.append('description', data.description);
      
      if (files.length > 0) {
        form.append('resourceType', 'file');
        files.forEach((file, index) => {
          form.append('files', {
            uri: file.uri,
            name: file.name,
            type: file.mimeType,
          } as any);
        });
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
          rules={{ maxLength: 800}}
          defaultValue=''
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              title="Descrição"
              placeholder="Conte-nos mais sobre o seu recurso"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              multiline
              numberOfLines={4}
              maxLength={800}
            />
          )}
        />

        <View style={styles.fileUploadBlock}>
          <Text style={styles.label}>Adicionar Arquivos</Text>
          <Pressable style={styles.uploadArea} onPress={pickDocuments}>
            <View style={styles.uploadContent}>
              <Text style={styles.uploadCta}>Clique para adicionar arquivos</Text>
              <Text style={styles.uploadHint}>Você pode selecionar múltiplos arquivos</Text>
            </View>
          </Pressable>
          
          {files.length > 0 && (
            <View style={styles.filesList}>
              <Text style={styles.filesListTitle}>Arquivos selecionados ({files.length})</Text>
              {files.map((file, index) => (
                <View key={index} style={styles.fileCardContainer}>
                  <FileCard 
                    file={convertToResourceFile(file, index)} 
                    onPress={() => {}} // Disable file opening during upload
                  />
                </View>
              ))}
            </View>
          )}
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
    marginTop: 24,
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
  filesList: {
    marginTop: 12,
    gap: 12,
  },
  filesListTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: Colors.light.text[5],
    marginBottom: 8,
  },
  fileCardContainer: {
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff4444',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
