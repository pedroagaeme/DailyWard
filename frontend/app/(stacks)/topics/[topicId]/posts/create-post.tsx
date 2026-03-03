import { PostImageButton } from '@/components/PostImageButton';
import { FormInput } from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { PostService } from '@/services/postService';
import { router, useFocusEffect, useGlobalSearchParams } from 'expo-router';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View, TextInput, useWindowDimensions, Keyboard, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomImage, CustomProfileImage } from '@/components/CustomImage';
import { useUserProfile } from '@/hooks/useUserProfile';
import { ScreenHeader } from '@/components/ScreenHeader';
import Animated, { useAnimatedKeyboard, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { ApiInterfacingButton } from '@/components/ApiInterfacingButton';
import { useQueryClient } from '@tanstack/react-query';

export default function CreatePostPage() {
  const { profile, isLoading } = useUserProfile();
  const { control, handleSubmit } = useForm();
  const  insets  = useSafeAreaInsets(); 
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useGlobalSearchParams();
  const topicId = params.topicId as string | undefined;
  const { height: screenHeight } = useWindowDimensions();
  const queryClient = useQueryClient();

  // Keyboard animation
  const keyboard = useAnimatedKeyboard();
  const footerHeight = useSharedValue(0);
  
  const contentTextRef = useRef<TextInput>(null);

  const animatedContainerStyle = useAnimatedStyle(() => {
    'worklet';
    return {
      maxHeight: screenHeight - insets.bottom - insets.top,
      height: screenHeight - keyboard.height.value - insets.top,
    };
  });

  const onSubmit = async (data:any) => {
    if (!topicId) {
      console.error('No topic selected');
      return;
    }

    setIsSubmitting(true);
    const result = await PostService.createPost(topicId, {
      contentText: data.contentText,
      contentPicUrl: image
    });

    if (result.status === 201) {
      console.log('Post created:', result.data);
      queryClient.invalidateQueries({ queryKey: ['posts', topicId] });
      router.back();
    } else {
      Alert.alert('Erro', result.error || 'Ocorreu um erro inesperado');
      console.error('Error creating post:', result);
    }
    setIsSubmitting(false);
  };


  return (
    <View style={[styles.container]}>
      <ScreenHeader title="Criar Postagem" />
      <View style={[styles.body]}>
        <Animated.View style={[animatedContainerStyle]}>
          <View style={styles.postContainer}>
            <View style={styles.contentContainer}>
              <Controller
                name="contentText"
                control={control}
                rules={{ required: true, maxLength: 800 }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    ref={contentTextRef}
                    autoFocus
                    placeholder="Escreva sua postagem..."
                    onChangeText={onChange}
                    value={value}
                    multiline
                    borderless={true}
                    maxLength={800}
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
              />
            </View>
          </View>
        <View 
          style={styles.footer}
          onLayout={(event) => {
            footerHeight.value = event.nativeEvent.layout.height;
          }}
        >
          <View style={styles.row}>
            <PostImageButton
              mode={image ? 'remove' : 'add'}
              setImage={setImage} 
              inputRef={contentTextRef} 
            />
            <Text style={styles.numberOfImagesText}>{image ? '1 / 1' : '0 / 1'}</Text>
          </View>
          <ApiInterfacingButton 
            onPress={handleSubmit(onSubmit)} 
            label="Enviar"
            isLoading={isSubmitting}
            style={styles.createPostButton}
          />
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
  row: {
    flexDirection:'row',
    gap: 12,
    alignItems:'center',
  },
  numberOfImagesText: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.primary,
  }
});