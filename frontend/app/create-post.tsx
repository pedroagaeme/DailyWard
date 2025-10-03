import {View, StyleSheet, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import { Colors } from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SendPostButton } from '@/components/SendPostButton';
import { useForm, Controller } from 'react-hook-form';
import { axiosPrivate } from '@/utils/api';
import { router } from 'expo-router';
import { useTopic } from '@/utils/topicContext';
import { useAuth } from '@/utils/authContext';

export default function CreatePostPage() {
  const { topicId } = useTopic();
  const { profile } = useAuth();
  const { control, handleSubmit } = useForm();

  const onSubmit = (data:any) => {
    axiosPrivate.post(`/users/me/topics/${topicId}/posts/`, data)
      .then(response => {
        console.log('Post created:', response.data);
      })
      .then(() => router.back())
      .catch(error => {
        console.error('Error creating post:', error);
      });
      
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.body}>
        <KeyboardAvoidingView style={{flex:1, gap: 24}} behavior="padding">
          <Text style={styles.sectionTitle}>Criar Postagem</Text>
          <View style={styles.postContainer}>
            <View style={styles.profileSection}>
            <View style={styles.profilePic} />
              <Text style={styles.posterName}>{profile?.name}</Text>
            </View>
            <Controller
              name="contentText"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Escreva sua postagem..."
                  multiline
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
              rules={{ required: true }}
            />
            <View style={styles.footer} >
          <SendPostButton onPress={handleSubmit(onSubmit)} />
        </View>
        </View>
      </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'flex-start',
    backgroundColor: Colors.light.background[100],
    paddingHorizontal:16,
  },
  body: {
    flex:1,
    paddingTop:32,
  },
  sectionTitle: {
    fontFamily:'Inter_600SemiBold',
    letterSpacing: -0.2,
    fontSize: 28,
    lineHeight: 34,
    color: Colors.light.text[5],
  },
  subsectionTitle: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.light.text[5],
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:12,
  },
  profilePic: {
    width: 48,
    aspectRatio: 1,
    borderRadius: 30,
    backgroundColor: Colors.light.background[90],
  },
  posterName: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text[5],
  },
  postContainer: {
    flex:1,
    backgroundColor: Colors.light.background[100],
    gap:8,
  },
  input: {
    flex:1,
    fontFamily:'Inter_400Regular',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.light.text[5],
    textAlignVertical: 'top',
  },
  footer: {
    justifyContent:'flex-end',
    alignItems:'center',
    flexDirection:'row',
    marginBottom: 8,
  },
});