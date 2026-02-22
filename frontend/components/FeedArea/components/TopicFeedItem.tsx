import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ListRenderItem, StyleSheet, Text, View, Pressable } from 'react-native';
import { CustomImage, CustomProfileImage } from '@/components/CustomImage';
import { TopicFeedItem } from '@/types';
import { VerticalEllipsisIcon } from '@/assets/images/vertical-ellipsis-icon';
import { useState, useRef } from 'react';
import { IconButton } from '@/components/IconButton';
import { PostService } from '@/services/postService';
import { useQueryClient } from '@tanstack/react-query';
import { EditDeleteBottomSheet } from '@/components/EditDeleteBottomSheet';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useTopicInfo } from '@/hooks/useTopicInfo';
import { calculatePermissions } from '@/utils/permissions';
import { useFeedAreaContext } from '@/contexts/feedAreaContext';

function TopicFeedItemButton({item}:{item:TopicFeedItem}) {
  const { topicId, postId: currentPostId } = useGlobalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const { profile } = useUserProfile();
  const { data: topicInfo } = useTopicInfo(topicId as string || '');
  const isOnDetailPage = currentPostId === item.id.toString();
  const itemHeightRef = useRef<number>(0);
  const { onItemAboutToDelete } = useFeedAreaContext();
  
  const { canEdit, canDelete } = calculatePermissions(
    item.posterId,
    profile?.id ?? null,
    topicInfo?.data.isLoggedInUserAdmin ?? false
  );

  const handlePress = () => {
    router.push({
      pathname: '/topics/[topicId]/posts/[postId]',
      params: {
        postId: item.id,
        topicId: topicId
      }
    });
  };

  const handleEllipsisPress = () => {
    setModalVisible(true);
  };

  const handleEditPost = () => {
    setModalVisible(false);
    router.push({
      pathname: '/topics/[topicId]/posts/edit-post',
      params: {
        topicId: topicId,
        postId: item.id
      }
    });
  };

  const handleDeletePost = async (): Promise<boolean> => {
    // Increase padding by item height before deletion
    if (itemHeightRef.current > 0) {
      onItemAboutToDelete(itemHeightRef.current);
    }

    if (!topicId) return false;
    
    const result = await PostService.deletePost(topicId as string, item.id.toString());
    
    if (result && (result.status === 200 || result.status === 204)) {
      // Invalidate posts queries to refresh the feed
      queryClient.invalidateQueries({ queryKey: ['posts'] }); 
      
      // If on detail page, navigate back
      if (isOnDetailPage) {
        router.back();
      }
      return true;
    }
    return false;
  };
  
  return(
    <Pressable 
      style={styles.itemContainer} 
      onPress={handlePress}
      onLayout={(event) => {
        itemHeightRef.current = event.nativeEvent.layout.height;
      }}
    >
      <View style={styles.headerRow}>
        <View style={styles.profileSection}>
          <CustomProfileImage 
            source={item.posterProfilePicUrl} 
            fullName={item.posterName} 
            style={styles.profilePic}
          />
          <Text style={styles.posterName}>{item.posterName}</Text>
        </View>
        <View style={styles.timeAndOptions}>
          <Text style={styles.hourText}>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          {canDelete && (
            <IconButton 
              onPress={handleEllipsisPress} 
              borders={{right: true}} 
              outerboxRadius={10} 
              innerSize={24} 
              style={styles.ellipsisButton}
            >
              <VerticalEllipsisIcon width={24} height={24} color={Colors.light.text[30]} />
            </IconButton>
          )}
        </View>
      </View>
      <View style={styles.contentArea}>
      {item.contentText && <Text style={styles.contentText} numberOfLines={3}>{item.contentText}</Text>}
      {item.contentPicUrl && <CustomImage source={item.contentPicUrl} style={styles.contentPic} />}
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
    </Pressable>
  )
}

export const renderTopicFeedItem: ListRenderItem<TopicFeedItem> = ({item}) => (
  <TopicFeedItemButton item={item} />
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.light.background[100],
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 8,
    gap:12,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.12)',
  },
  headerRow: {
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
  posterName: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text[5],
  },
  contentArea: {
    flex:1,
    gap:16,
  },
  contentPic: {
    width: '100%',
    aspectRatio: 16/9,
    borderRadius: 16,
    backgroundColor: Colors.light.background[90],
    resizeMode: 'cover',
  },
  contentText: {
    fontFamily:'Inter_400Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.light.text[5],
  },
  hourText: {
    fontFamily:'Inter_400Regular',
    fontSize: 12,
    letterSpacing:0.5,
    color: Colors.light.text[30],
  },
  timeAndOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.light.background[90],
  },
  ellipsisButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});