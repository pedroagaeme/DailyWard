import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import * as ImagePicker from 'expo-image-picker';
import { CreateTopicButton } from '@/components/CreateTopicButton';
import { FormInput } from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { TopicService } from '@/services/topicService';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import mime from 'mime';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomImage } from '@/components/CustomImage';

interface CreateTopicForm {
  title: string;
  description: string;
}

export default function CreateTopic() {
  const { control, handleSubmit } = useForm<CreateTopicForm>();
  const insets = useSafeAreaInsets();
  const [image, setImage] = useState<string | null>(null);

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
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const onSubmit = async (data: CreateTopicForm) => {
    const result = await TopicService.createTopic({
      title: data.title,
      description: data.description,
      topicImageUrl: image ? {
        uri: image,
        name: image.split('/').pop() || 'topic_image.jpg',
        type: mime.getType(image) || 'image/jpeg',
      } : undefined
    });

    if (result && result.status === 201) {
      router.back();
    } else {
      console.error('Error creating topic:', result);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView 
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        style={styles.body} 
        contentContainerStyle={{paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <GoBackIcon width={24} height={24} color={Colors.light.text[5]} />
          </Pressable>
          <Text style={styles.sectionTitle}>Criar Tópico</Text>
          <View style={{ width: 24, height: 24 }} />
        </View>

        <Controller
          control={control}
          name="title"
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              title="Título"
              placeholder="Dê um título ao tópico"
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
          rules={{ maxLength: 120 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              title="Descrição"
              placeholder="Conte-nos mais sobre o seu tópico"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              multiline
              numberOfLines={4}
              maxLength={120}
            />
          )}
        />

        <View style={styles.pictureBlock}>
          <Text style={styles.label}>Imagem</Text>
          <Pressable style={[styles.uploadArea, image && styles.uploadAreaWithImage]} onPress={pickImage}>
            {image ? (
              <CustomImage source={image} style={styles.previewImage} />
            ) : (
              <View style={styles.uploadContent}>
                <Text style={styles.uploadCta}>Clique para fazer upload</Text>
                <Text style={styles.uploadHint}>SVG, PNG, JPG ou GIF </Text>
              </View>
            )}
          </Pressable>
        </View>

        <View style={styles.footer}>
          <CreateTopicButton onPress={handleSubmit(onSubmit)} />
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
  pictureBlock: {
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
  },
  uploadAreaWithImage: {
    padding: 0,
    borderStyle: 'solid',
    borderWidth: 0.5,
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
  textAreaContainer: {},
  textArea: {},
  footer: {
    marginTop: 'auto',
    marginBottom: 8,
    alignItems: 'center',
  },
});


