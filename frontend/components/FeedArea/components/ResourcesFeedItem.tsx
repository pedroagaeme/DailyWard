import { Colors } from '@/constants/Colors';
import { ListRenderItem, StyleSheet, Text, View, Pressable } from 'react-native';
import { router, useGlobalSearchParams } from 'expo-router';
import { CustomProfileImage } from '@/components/CustomImage';
import { ResourcesFeedItem } from '@/types';
import { VerticalEllipsisIcon } from '@/assets/images/vertical-ellipsis-icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { IconButton } from '@/components/IconButton';
import { ResourceService } from '@/services/resourceService';
import { useQueryClient } from '@tanstack/react-query';
import { EditDeleteBottomSheet } from '@/components/EditDeleteBottomSheet';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useTopicInfo } from '@/hooks/useTopicInfo';
import { calculatePermissions } from '@/utils/permissions';

const formatDate = (dateString?: string) => {
  if (!dateString) return 'Data não disponível';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());

  // Calculate different time units (always round down using Math.floor)
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // For times less than 24 hours, show hours, minutes, or "menos de um minuto"
  if (diffTime < 24 * 60 * 60 * 1000) {
    if (diffHours > 0) {
      return `${diffHours} hora${diffHours > 1 ? 's' : ''} atrás`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''} atrás`;
    } else {
      return 'Agora';
    }
  }
  
  // For times 24 hours or more
  if (diffDays === 1) return '1 dia atrás';
  if (diffDays < 7) return `${diffDays} dias atrás`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''} atrás`;
  return `${Math.floor(diffDays / 30)} mês${Math.floor(diffDays / 30) > 1 ? 'es' : ''} atrás`;
};

function ResourcesFeedItemButton({item}:{item:ResourcesFeedItem}) {
  const params = useGlobalSearchParams();
  const topicId = params.topicId as string;
  const currentResourceId = params.resourceId as string | undefined;
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { profile } = useUserProfile();
  const { data: topicInfo } = useTopicInfo(topicId);
  const isOnDetailPage = currentResourceId === item.id.toString();
  
  const { canEdit, canDelete } = calculatePermissions(
    item.posterId,
    profile?.id ?? null,
    topicInfo?.data.isLoggedInUserAdmin ?? false
  );

  const handlePress = () => {
    router.push({
      pathname: '/topics/[topicId]/resources/[resourceId]',
      params: {
        resourceId: item.id,
        topicId: topicId
      }
    });
  };

  const handleEllipsisPress = () => {
    setModalVisible(true);
  };

  const handleEditResource = () => {
    setModalVisible(false);
    router.push({
      pathname: '/topics/[topicId]/resources/edit-resource',
      params: {
        topicId: topicId,
        resourceId: item.id
      }
    });
  };

  const handleDeleteResource = async (): Promise<boolean> => {
    if (!topicId) return false;
    
    const result = await ResourceService.deleteResource(topicId, item.id.toString());
    
    if (result && (result.status === 200 || result.status === 204)) {
      // Invalidate resources queries to refresh the feed
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      
      // If on detail page, navigate back
      if (isOnDetailPage) {
        router.back();
      }
      return true;
    }
    return false;
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          {item.description &&
            <Text style={styles.descriptionText} numberOfLines={3}>{item.description}</Text>
          }
          {item.files && item.files.length > 0 && (
            <Text style={styles.fileCountText}>
              {item.files.length} arquivo{item.files.length > 1 ? 's' : ''}
            </Text>
          )}
        </View>
        <View style={styles.footerRow}>
          <View style={{flexDirection:'row', alignItems:'center', gap:10}}>
            <CustomProfileImage 
              source={item.posterProfilePicUrl}
              fullName={item.posterName || 'Usuário'}
              style={styles.posterProfilePic}
            />
            <View style={styles.nameAndDateContainer}>
              <Text style={styles.posterName}>{item.posterName || 'Usuário'}</Text>
              <Text style={styles.dateText}>{formatDate(item.createdAt)}</Text>
            </View>
          </View>
          {canDelete && (
            <IconButton 
              onPress={(e) => {
                e.stopPropagation();
                handleEllipsisPress();
              }}
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

      <EditDeleteBottomSheet
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onEdit={handleEditResource}
        onDelete={handleDeleteResource}
        canEdit={canEdit}
        editLabel="Editar recurso"
        deleteLabel="Deletar recurso"
        deleteTitle="Deletar Recurso"
        deleteMessage="Tem certeza que deseja deletar este recurso? Esta ação não pode ser desfeita."
      />
    </Pressable>
  );
}

export const renderResourcesFeedItem: ListRenderItem<ResourcesFeedItem> = ({item}) => (
  <ResourcesFeedItemButton item={item} />
);

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: Colors.light.background[95],
    borderRadius: 15,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.light.background[80],
    gap:20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  footerRow: {
    gap:12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  posterName: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 13,
    lineHeight: 16,
    color: Colors.light.text[5],
  },
  title: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 18,
    color: Colors.light.text[5],
    lineHeight: 22,
  },
  nameAndDateContainer: {
    gap: 5,
  },
  dateText: {
    fontFamily:'Inter_400Regular',
    fontSize: 13,
    lineHeight: 16,
    color: Colors.light.text[30],
    opacity: 0.9,
  },
  descriptionText: {
    marginTop:8,
    fontFamily:'Inter_400Regular',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.light.text[30],
  },
  fileCountText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    color: Colors.light.primary,
    marginTop: 4,
  },
  posterProfilePic: {
    width: 35,
    aspectRatio: 1,
    borderRadius: 50,
  },
  typeBadge: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.light.background[95],
  },
  typeBadgeText: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 12,
    color: Colors.light.text[30],
    textAlign: 'center',
  },
  ellipsisButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
