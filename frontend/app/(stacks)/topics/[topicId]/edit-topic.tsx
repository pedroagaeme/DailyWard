import * as ImagePicker from 'expo-image-picker';
import { FormInput } from '@/components/FormInput';
import { CloseIcon } from '@/assets/images/close-icon';
import { IconButton } from '@/components/IconButton';
import { Colors } from '@/constants/Colors';
import { TopicService } from '@/services/topicService';
import { router, useGlobalSearchParams } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import mime from 'mime';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomImage } from '@/components/CustomImage';
import { UploadImageIcon } from '@/assets/images/upload-image-icon';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useQueryClient } from '@tanstack/react-query';
import { ApiInterfacingButton } from '@/components/ApiInterfacingButton';

interface EditTopicForm {
  title: string;
  description: string;
}

export default function EditTopic() {
  const { topicId: topicIdParam } = useGlobalSearchParams();
  const topicId = topicIdParam as string || '';
  const { control, handleSubmit, reset } = useForm<EditTopicForm>();
  const insets = useSafeAreaInsets();
  const [image, setImage] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Fetch existing topic data
  useEffect(() => {
    const fetchTopic = async () => {
      if (!topicId) return;
      
      setIsLoading(true);
      const topic = await TopicService.getTopic(topicId);
      
      if (topic && topic.data) {
        reset({ 
          title: topic.data.title || '',
          description: topic.data.description || ''
        });
        if (topic.data.topicImageUrl) {
          setExistingImageUrl(topic.data.topicImageUrl);
        }
      }
      setIsLoading(false);
    };

    fetchTopic();
  }, [topicId, reset]);

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
        // Clear existing image URL when new image is picked
        setExistingImageUrl(null);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const removeImage = () => {
    setImage(null);
    setExistingImageUrl(null);
  };

  const onSubmit = async (data: EditTopicForm) => {
    if (!topicId) {
      Alert.alert('Erro', 'ID do tópico não encontrado');
      return;
    }

    setIsSubmitting(true);
    
    // Determine what to send for topicImageUrl
    let topicImageUrl: string | null | undefined;
    if (image) {
      topicImageUrl = image;
    } else if (!image && !existingImageUrl) {
      topicImageUrl = null;
    } else {
      topicImageUrl = undefined;
    }
    
    const result = await TopicService.updateTopic(topicId, {
      title: data.title,
      description: data.description,
      topicImageUrl: topicImageUrl
    });

    if (result.status === 200 || result.status === 201) {
      queryClient.invalidateQueries({ queryKey: ['topic', topicId] });
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      router.back();
    } else {
      Alert.alert('Erro', result.error || 'Ocorreu um erro inesperado');
      console.error('Error updating topic:', result);
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  const displayImage = image || existingImageUrl;

  return (
    <View style={styles.container}>
      <ScreenHeader title="Editar Tópico" />
      <KeyboardAwareScrollView 
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        style={styles.body} 
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >

        <Controller
          control={control}
          name="title"
          rules={{ required: true, maxLength: 50 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              title="Título"
              placeholder="Dê um título ao tópico"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              autoCapitalize="sentences"
              maxLength={50}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          rules={{ maxLength: 800 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              title="Descrição"
              placeholder="Conte-nos mais sobre o seu tópico"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              multiline
              maxLength={800}
            />
          )}
        />

        <View style={styles.pictureBlock}>
          <View style={styles.titleRow}>
            <Text style={styles.label}>Imagem</Text>
            {displayImage && (
              <IconButton
                style={styles.removeImageButton}
                outerboxRadius={14}
                innerSize={24}
                borders={{ top: true, right: true, bottom: true, left: true }}
                onPress={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
              >
                <CloseIcon width={24} height={24} color={Colors.light.error} />
              </IconButton>
            )}
          </View>
          <Pressable style={[styles.uploadArea, displayImage && styles.uploadAreaWithImage]} onPress={pickImage}>
            {displayImage ? (
              <CustomImage source={displayImage} style={styles.previewImage} />
            ) : (
              <View style={styles.uploadContent}>
                <UploadImageIcon width={40} height={40} color={Colors.light.primary} />
                <Text style={styles.uploadCta}>Clique para fazer upload</Text>
                <Text style={styles.uploadHint}>SVG, PNG, JPG ou GIF </Text>
              </View>
            )}
          </Pressable>
        </View>

        <View style={styles.footer}>
          <ApiInterfacingButton 
            onPress={handleSubmit(onSubmit)} 
            label="Salvar"
            isLoading={isSubmitting}
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
  pictureBlock: {
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  uploadAreaWithImage: {
    padding: 0,
    aspectRatio: 1,
    width: '100%',
  },
  uploadContent: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    height:120,
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
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  removeImageButton: {
    width: 24,
    height: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
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
});

