import { UploadFileIcon } from '@/assets/images/upload-file-icon';
import * as DocumentPicker from 'expo-document-picker';
import { FormInput } from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { ResourceService } from '@/services/resourceService';
import { router, useGlobalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FileCard } from '@/components/FileCard';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ApiInterfacingButton } from '@/components/ApiInterfacingButton';
import { useQueryClient } from '@tanstack/react-query';

interface CreateResourceForm {
  title: string;
  description: string;
}

export default function AddResource() {
  const { topicId: topicIdParam } = useGlobalSearchParams();
  const topicId = topicIdParam as string || '';
  const { control, handleSubmit, formState: {errors} } = useForm<CreateResourceForm>();
  const insets = useSafeAreaInsets();
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

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
    if (!topicId) {
      Alert.alert('Erro', 'Tópico não selecionado');
      return;
    }

    setIsLoading(true);
    const result = await ResourceService.createResource(topicId, {
      title: data.title,
      description: data.description,
      resourceType: files.length > 0 ? 'file' : 'announcement',
      files: files.length > 0 ? files : undefined
    });
    
    if (result.status === 201) {
      queryClient.invalidateQueries({ queryKey: ['resources', topicId] });
      router.back();
    } else {
      Alert.alert('Erro', result.error || 'Ocorreu um erro inesperado');
      console.error('Error creating resource:', result);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Adicionar Recurso" />
      <KeyboardAwareScrollView enableOnAndroid={true} style={styles.body} contentContainerStyle={{ paddingBottom: insets.bottom + 20}}>

        <Controller
          control={control}
          name="title"
          rules={{ required: 'Título é obrigatório', maxLength: 50 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              title="Título"
              placeholder="Dê um título ao recurso"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              autoCapitalize="sentences"
              errors={errors.title}
              maxLength={50}
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
              autoCapitalize="sentences"
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
              <UploadFileIcon width={40} height={40} color={Colors.light.primary} />
              <Text style={styles.uploadCta}>Clique para adicionar arquivos</Text>
              <Text style={styles.uploadHint}>Você pode selecionar múltiplos arquivos</Text>
            </View>
          </Pressable>
          
          {files.length > 0 && (
            <View style={styles.filesList}>
              <Text style={styles.filesListTitle}>Arquivos selecionados ({files.length})</Text>
              {files.map((file, index) => (
                <FileCard 
                  key={index}
                  file={convertToResourceFile(file, index)} 
                  onPress={() => {}} // Disable file opening during upload
                  showCloseIcon={true}
                  onRemove={() => removeFile(index)}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.footer}>
          <ApiInterfacingButton 
            onPress={handleSubmit(onSubmit)} 
            label="Enviar"
            isLoading={isLoading}
            style={styles.button}
          />
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
    paddingTop: 8,
    gap: 8,
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
  },
  uploadContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadCta: {
    marginTop: 12,
    fontFamily: 'Inter_600SemiBold',
    color: Colors.light.text[5],
  },
  uploadHint: {
    marginTop: 4,
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
});
