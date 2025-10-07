import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import { CreateTopicButton } from '@/components/CreateTopicButton';
import { FormInput } from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { axiosPrivate } from '@/utils/api';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CreateTopicForm {
  title: string;
  description: string;
}

export default function CreateTopic() {
  const { control, handleSubmit } = useForm<CreateTopicForm>();
  const insets = useSafeAreaInsets();

  const onSubmit = async (data: CreateTopicForm) => {
    try {
      await axiosPrivate.post('/users/me/topics/', data);
      router.back();
    } catch (error) {
      console.error('Error creating topic:', error);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom}] }>
      <KeyboardAvoidingView style={styles.body} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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

        <View style={styles.pictureBlock}>
          <Text style={styles.label}>Imagem</Text>
          <Pressable style={styles.uploadArea}>
            <View style={styles.uploadContent}>
              <Text style={styles.uploadCta}>Clique para fazer upload</Text>
              <Text style={styles.uploadHint}>SVG, PNG, JPG ou GIF (máx. 800x400px)</Text>
            </View>
          </Pressable>
        </View>

        <Controller
          control={control}
          name="description"
          rules={{ maxLength: 100 }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              title="Descrição"
              placeholder="Conte-nos mais sobre o seu tópico"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              multiline
              numberOfLines={4}
              maxLength={100}
            />
          )}
        />

        <View style={styles.footer}>
          <CreateTopicButton onPress={handleSubmit(onSubmit)} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background[100],
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
    borderColor: Colors.light.background[80],
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.background[100],
    marginBottom: 24,
  },
  uploadContent: {
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
  textAreaContainer: {},
  textArea: {},
  footer: {
    marginTop: 'auto',
    marginBottom: 8,
    alignItems: 'center',
  },
});


