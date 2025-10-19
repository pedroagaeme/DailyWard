import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import { FormInput } from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { TopicService } from '@/services';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTopics } from '@/contexts';

interface JoinTopicForm {
  code: string;
}

export default function JoinTopic() {
  const { fetchUserTopics } = useTopics();
  const { control, handleSubmit, formState: { errors } } = useForm<JoinTopicForm>();
  const insets = useSafeAreaInsets();

  const onSubmit = async (data: JoinTopicForm) => {
    const result = await TopicService.joinTopic(data.code);
    
    if (result && result.status === 200) {
      fetchUserTopics!();
      router.back();
    } else {
      console.error('Error joining topic:', result);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView 
        enableOnAndroid={true}
        style={styles.body} 
        contentContainerStyle={{paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <GoBackIcon width={24} height={24} color={Colors.light.text[5]} />
          </Pressable>
          <Text style={styles.sectionTitle}>Entrar em Tópico</Text>
          <View style={{ width: 24, height: 24 }} />
        </View>

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
    marginBottom: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
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
