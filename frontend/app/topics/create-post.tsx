import { GoBackIcon } from '@/assets/images/header-icons/go-back-icon';
import { AddImageToPostButton } from '@/components/AddImageToPostButton';
import { FormInput } from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { axiosPrivate } from '@/utils/api';
import { useAuth } from '@/utils/authContext';
import { useTopics } from '@/utils/topicsContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomImage, CustomProfileImage } from '@/components/Image/ImageComponent';

export default function CreatePostPage() {
  const { topicState } = useTopics();
  const { authState } = useAuth();
  const { control, handleSubmit } = useForm();
  const  insets  = useSafeAreaInsets(); 
  const [image, setImage] = useState<string | null>(null);
  const topicId = topicState?.id;
  
  const onSubmit = async (data:any) => {
    if (!topicId) {
      console.error('No topic selected');
      return;
    }
    const formData = new FormData();
    formData.append('contentText', data.contentText);
    if (image) {
      formData.append('contentPicUrl', {
        uri: image,
        name: image?.split('/').pop() || 'post_image.jpg',
        type: 'image/jpeg',
      } as any);
    }

    const response = await axiosPrivate.post(`/users/me/topics/${topicId}/posts/`, formData, 
      {headers: {'Content-Type': 'multipart/form-data'}}
    );

    if (response.status === 201) {
      console.log('Post created:', response.data);
      router.back();
    } else {
      console.error('Error creating post:', response);
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.body, {paddingBottom: insets.bottom || 16, paddingTop: insets.top || 16}]}>
        <KeyboardAvoidingView style={{flex:1,gap: 16}} behavior={Platform.OS === "ios" ? "padding" : undefined}>
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
                <CustomProfileImage 
                  source={undefined} 
                  fullName={(authState?.profile?.name || '')} 
                  style={{width:48, borderRadius: 24}}/>
                <Text style={styles.posterName}>{authState?.profile?.name}</Text>
              </View>
              <Controller
                name="contentText"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    autoFocus
                    placeholder="Escreva sua postagem..."
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    multiline
                    borderless={true}
                    additionalElements={[image ? <CustomImage key={1} source={image} style={styles.imagePreview} /> : null]}
                  />
                )}
                rules={{ required: true }}
              />
            </View>
        </View>
        <View style={styles.footer} >
          <AddImageToPostButton setImage={setImage} />
          <Pressable onPress={handleSubmit(onSubmit)} style={styles.createPostButton}>
            <Text style={styles.createPostButtonText}>Enviar</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      </View>
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
    padding:16
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
    paddingHorizontal: 16,
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
    paddingHorizontal: 16,
    borderTopWidth: 0.2,
    borderTopColor: Colors.light.background[70],
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingBottom: 4,
    paddingTop: 12,
    gap: 12,
  },
  createPostButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems:'center',
  },
  createPostButtonText: {
    fontFamily:'Inter_500Medium',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.light.background[100],
  },
  imagePreview: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
    borderRadius: 16,
  },
});