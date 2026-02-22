import { AddImageToPostButton } from '@/components/AddImageToPostButton';
import { FormInput } from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { PostService } from '@/services/postService';
import { router, useGlobalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View, TextInput, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomImage, CustomProfileImage } from '@/components/CustomImage';
import { useUserProfile } from '@/hooks/useUserProfile';
import { ScreenHeader } from '@/components/ScreenHeader';
import Animated, { useAnimatedKeyboard, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export default function EditPostPage() {
  const { profile, isLoading: isProfileLoading } = useUserProfile();
  const { control, handleSubmit, reset } = useForm();
  const  insets  = useSafeAreaInsets(); 
  const [image, setImage] = useState<string | null>(null);
  const params = useGlobalSearchParams();
  const topicId = params.topicId as string | undefined;
  const postId = params.postId as string | undefined;
  const { height: screenHeight } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState(true);
  
  const contentTextRef = useRef<TextInput>(null);

  // Fetch existing post data
  useEffect(() => {
    const fetchPost = async () => {
      if (!topicId || !postId) return;
      
      setIsLoading(true);
      const post = await PostService.fetchPostById(topicId, postId);
      
      if (post) {
        reset({ contentText: post.contentText });
        setImage(post.contentPicUrl || null);
      }
      setIsLoading(false);
    };

    fetchPost();
  }, [topicId, postId, reset]);

  // Keyboard animation
  const keyboard = useAnimatedKeyboard();
  const footerHeight = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      maxHeight: screenHeight - insets.bottom - insets.top,
      height: screenHeight - keyboard.height.value - insets.top,
    };
  });
  
  const onSubmit = async (data:any) => {
    if (!topicId || !postId) {
      console.error('No topic or post ID');
      return;
    }
    const result = await PostService.updatePost(topicId, postId, {
      contentText: data.contentText,
      contentPicUrl: image || undefined
    });

    if (result && (result.status === 200 || result.status === 201)) {
      console.log('Post updated:', result.data);
      router.back();
    } else {
      console.error('Error updating post:', result);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      <ScreenHeader title="Editar Postagem" />
      <View style={[styles.body]}>
        <Animated.View style={[animatedContainerStyle]}>
          <View style={styles.postContainer}>
            <View style={styles.contentContainer}>
              <Controller
                name="contentText"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    ref={contentTextRef}
                    autoFocus
                    placeholder="Escreva sua postagem..."
                    onChangeText={onChange}
                    value={value}
                    multiline
                    borderless={true}
                    headerComponent={
                    <View style={styles.profileSection}>
                      <CustomProfileImage 
                        source={profile?.profilePicUrl} 
                        fullName={profile?.firstName + ' ' + profile?.lastName || ''} 
                        style={styles.profilePic}/>
                      <Text style={styles.posterName}>{profile?.firstName + ' ' + profile?.lastName}</Text>
                    </View>
                    }
                    footerComponent={image ? <CustomImage source={image} style={styles.imagePreview} /> : null}
                  />
                )}
                rules={{ required: true }}
              />
            </View>
          </View>
        <View 
          style={styles.footer}
          onLayout={(event) => {
            footerHeight.value = event.nativeEvent.layout.height;
          }}
        >
          <AddImageToPostButton 
            setImage={setImage} 
            inputRef={contentTextRef} 
          />
          <Pressable onPress={handleSubmit(onSubmit)} style={styles.createPostButton}>
            <Text style={styles.createPostButtonText}>Salvar</Text>
          </Pressable>
        </View>
        </Animated.View>
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
    gap:16,
  },
  profilePic: {
    width: 48,
    height: 48,
    borderRadius: 50,
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
    boxShadow: '0 0 4px rgba(0, 0, 0, 0.2) inset',
    backgroundColor: Colors.light.background[95],
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
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingTop: 12,
    gap: 12,
    backgroundColor: Colors.light.background[100],
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

