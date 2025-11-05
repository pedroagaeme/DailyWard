import { FormInput } from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { TopicService } from '@/services/topicService';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View, Alert, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScreenHeader } from '@/components/ScreenHeader';
interface JoinTopicForm {
  code: string;
}

export default function JoinTopic() {
  const { control, handleSubmit, formState: { errors } } = useForm<JoinTopicForm>();
  const insets = useSafeAreaInsets();

  const onSubmit = async (data: JoinTopicForm) => {
    const result = await TopicService.joinTopic(data.code);
    
    if (result && result.status === 200) {
      router.back();
    } else {
      console.error('Error joining topic:', result);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Entrar em Tópico" />
      <KeyboardAwareScrollView 
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        style={styles.body} 
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      >

        <View style={styles.content}>
          <Text style={styles.description}>
            Digite o código do tópico de 8 caracteres que você recebeu para entrar.
          </Text>

          <Controller
            control={control}
            name="code"
            rules={{ 
              required: 'Código é obrigatório',
              minLength: {
                value: 8,
                message: 'Código deve ter 8 caracteres'
              },
              maxLength: {
                value: 8,
                message: 'Código deve ter 8 caracteres'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                title="Código do Tópico"
                placeholder="Digite o código (ex: ABC12345)"
                onChangeText={(text) => onChange(text.toUpperCase())}
                onBlur={onBlur}
                value={value}
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={8}
                errors={errors.code}
                onSubmitEditing={handleSubmit(onSubmit)}
              />
            )}
          />
        </View>

        <View style={styles.footer}>
          <Pressable 
            style={styles.joinButton} 
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.joinButtonText}>Entrar</Text>
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
    paddingTop: 16,
    gap: 8,
  },
  content: {
    flex: 1,
    gap: 32,
  },
  description: {
    paddingHorizontal: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: Colors.light.text[30],
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
    marginBottom: 8,
    alignItems: 'center',
  },
  joinButton: {
    flexDirection: 'row',
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  joinButtonText: {
    fontFamily: 'Inter_500Medium',
    color: Colors.light.background[100],
    fontSize: 18,
    lineHeight: 28,
  },
});
