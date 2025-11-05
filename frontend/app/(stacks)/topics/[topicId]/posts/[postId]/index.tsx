import { TopicFeedItem } from '@/types';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomImage, CustomProfileImage } from '@/components/CustomImage';
import { PostService } from '@/services/postService';
import { SeePostHeader } from '@/components/SeePostHeader';
import { useState } from 'react';
import { useTopicInfo } from '@/hooks/useTopicInfo';
import { VerticalEllipsisIcon } from '@/assets/images/vertical-ellipsis-icon';
import { IconButton } from '@/components/IconButton';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { EditDeleteBottomSheet } from '@/components/EditDeleteBottomSheet';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { useUserProfile } from '@/hooks/useUserProfile';
import { calculatePermissions } from '@/utils/permissions';

export default function SeePostScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const params = useGlobalSearchParams();
    const topicId = params.topicId as string || '';
    const { data: topicInfo, isLoading: isTopicInfoLoading, isError: isTopicInfoError, error: topicInfoError } = useTopicInfo(topicId);
    const topicTitle = topicInfo?.data.title;
    const postId = params.postId as string || '';
    const queryClient = useQueryClient();
    const { profile } = useUserProfile();
    
    const [modalVisible, setModalVisible] = useState(false);

    const { data: item, isLoading: loading, isError, error, refetch } = useQuery({
        queryKey: ['post', topicId, postId],
        queryFn: () => PostService.fetchPostById(topicId, postId),
        enabled: !!postId && !!topicId,
    });

    useRefreshOnFocus(refetch);

    const { canEdit, canDelete } = calculatePermissions(
        item?.posterId,
        profile?.id ?? null,
        topicInfo?.data.isLoggedInUserAdmin ?? false
    );

    const handleEllipsisPress = () => {
        setModalVisible(true);
    };

    const handleEditPost = () => {
        setModalVisible(false);
        router.push({
            pathname: '/topics/[topicId]/posts/edit-post',
            params: {
                topicId: topicId,
                postId: postId
            }
        });
    };

    const handleDeletePost = async (): Promise<boolean> => {
        if (!topicId || !postId) return false;
        
        const result = await PostService.deletePost(topicId, postId);
        
        if (result && (result.status === 200 || result.status === 204)) {
            // Invalidate posts queries to refresh the feed
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            router.back();
            return true;
        }
        return false;
    };

    if (loading) {
        return (
            <View style={[styles.fullScreenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    if (isError || !item) {
        return (
            <View style={[styles.fullScreenContainer, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text>{error ? 'Erro ao carregar post' : 'Post não encontrado.'}</Text>
            </View>
        );
    }

    return (
        <View style={styles.fullScreenContainer}>
          <SeePostHeader 
            title={topicTitle} 
            rightComponent={
                canDelete ? (
                    <IconButton 
                        onPress={handleEllipsisPress}
                        borders={{right: true}} 
                        outerboxRadius={10} 
                        innerSize={24}
                    >
                        <VerticalEllipsisIcon width={24} height={24} color={Colors.light.text[5]} />
                    </IconButton>
                ) : (
                    <View style={{ width: 24, height: 24 }} />
                )
            }
          />
          <View style={styles.postContainer}>
              <View style={styles.postHeaderRow}>
                  <View style={styles.profileSection}>
                    <CustomProfileImage source={item.posterProfilePicUrl} fullName={item.posterName} style={styles.profilePic}/>
                    <Text style={styles.posterName}>{item.posterName}</Text>
                  </View>
                  <View >
                      <Text style={styles.hourText}>
                          {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </Text>
                      <Text style={styles.dateText}>
                          {new Date(item.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </Text>
                  </View>
              </View>
            <ScrollView 
            style={{ flex: 1 }} 
            contentContainerStyle={[styles.contentArea, { paddingBottom: insets.bottom }]} 
            showsVerticalScrollIndicator={false}
            >
            {item.contentText && <Text style={styles.contentText}>{item.contentText}</Text>}
            {item.contentPicUrl && <CustomImage source={item.contentPicUrl} style={styles.contentPic} />}
            </ScrollView>
          </View>

          <EditDeleteBottomSheet
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            canEdit={canEdit}
            editLabel="Editar post"
            deleteLabel="Deletar post"
            deleteTitle="Deletar Post"
            deleteMessage="Tem certeza que deseja deletar este post? Esta ação não pode ser desfeita."
          />
        </View>
    );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: Colors.light.background[100],
  },
  postContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postHeaderRow: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:12,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.light.background[90],
  },
  posterName: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text[5],
  },
  contentArea: {
    gap: 16,
  },
  contentText: {
    textAlign: 'justify',
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: Colors.light.text[5],
    lineHeight: 22,
  },
  contentPic: {
    width: '100%',
    height: undefined,
    aspectRatio: 16/9,
    borderRadius: 16,
    backgroundColor: Colors.light.background[90],
    resizeMode: 'cover',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  hourText: {
    fontFamily:'Inter_500Medium',
    fontSize: 14,
    letterSpacing:0.5,
    color: Colors.light.text[30],
    textAlign: 'right',
  },
  dateText: {
    fontFamily:'Inter_400Regular',
    fontSize: 12,
    color: Colors.light.text[30],
    textAlign: 'right',
    marginTop: 2,
  },
});
