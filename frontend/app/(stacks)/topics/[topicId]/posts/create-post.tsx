import { AddImageToPostButton } from '@/components/AddImageToPostButton';
import { FormInput } from '@/components/FormInput';
import { Colors } from '@/constants/Colors';
import { PostService } from '@/services/postService';
import { router, useFocusEffect, useGlobalSearchParams } from 'expo-router';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, StyleSheet, Text, View, TextInput, useWindowDimensions, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomImage, CustomProfileImage } from '@/components/CustomImage';
import { useUserProfile } from '@/hooks/useUserProfile';
import { ScreenHeader } from '@/components/ScreenHeader';
import Animated, { useAnimatedKeyboard, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

export default function CreatePostPage() {
  const { profile, isLoading } = useUserProfile();
  const { control, handleSubmit } = useForm();
  const  insets  = useSafeAreaInsets(); 
  const [image, setImage] = useState<string | null>(null);
  const params = useGlobalSearchParams();
  const topicId = params.topicId as string | undefined;
  const { height: screenHeight } = useWindowDimensions();

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

    const result = await PostService.createPost(topicId, {
      contentText: data.contentText,
      contentPicUrl: image || undefined
    });

    if (result && result.status === 201) {
      console.log('Post created:', result.data);
      router.back();
    } else {
      console.error('Error creating post:', result);
    }
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
            <Text style={styles.createPostButtonText}>Enviar</Text>
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