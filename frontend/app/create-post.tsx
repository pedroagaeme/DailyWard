import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import { CreateTopicButton } from '@/components/CreateTopicButton';
import { FormInput } from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { axiosPrivate } from '@/utils/api';
import { useAuth } from '@/utils/authContext';
import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreatePostPage() {
  const topicId = "1" // TODO: get from route params
  const { authState } = useAuth();
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
    <View style={[styles.container]}>
      <SafeAreaView style={styles.body}>
        <KeyboardAvoidingView style={{flex:1, gap: 16}} behavior="padding">
          <View style={styles.headerRow}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <GoBackIcon width={24} height={24} color={Colors.light.text[5]} />
            </Pressable>
            <Text style={styles.sectionTitle}>Criar Postagem</Text>
            <View style={{ width: 24, height: 24 }} />
          </View>
          <View style={styles.postContainer}>
            <View style={styles.contentContainer}>
              <View style={styles.profileSection}>
              <View style={styles.profilePic} />
                <Text style={styles.posterName}>{authState?.profile?.name}</Text>
              </View>
              <Controller
                name="contentText"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    placeholder="Escreva sua postagem..."
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    multiline
                    numberOfLines={6}
                    borderless = {true}
                  />
                )}
                rules={{ required: true }}
              />
            </View>
            <View style={styles.footer} >
              <CreateTopicButton onPress={handleSubmit(onSubmit)} />
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
  },
  body: {
    flex:1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily:'Inter_600SemiBold',
    letterSpacing: -0.2,
    fontSize: 20,
    lineHeight: 24,
    color: Colors.light.text[5],
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
  subsectionTitle: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.light.text[5],
  },
  contentContainer: {
    flex:1,
    gap:8,
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
    justifyContent:'space-between',
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