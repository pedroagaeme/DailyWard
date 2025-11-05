import { ResourcesFeedItem } from '@/types';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomProfileImage } from '@/components/CustomImage';
import { FileCard } from '@/components/FileCard';
import { ResourceService } from '@/services/resourceService';
import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useTopicInfo } from '@/hooks/useTopicInfo';
import { ScreenHeader } from '@/components/ScreenHeader';
import { VerticalEllipsisIcon } from '@/assets/images/vertical-ellipsis-icon';
import { IconButton } from '@/components/IconButton';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { EditDeleteBottomSheet } from '@/components/EditDeleteBottomSheet';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { useUserProfile } from '@/hooks/useUserProfile';
import { calculatePermissions } from '@/utils/permissions';

export default function SeeResourceScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const route = useRoute();
  const queryClient = useQueryClient();
  
  const resourceId = (route.params as { resourceId: string })?.resourceId || '';
  const topicId = (route.params as { topicId: string })?.topicId || '';
  const { data: topicInfo, isLoading: isTopicInfoLoading, isError: isTopicInfoError, error: topicInfoError } = useTopicInfo(topicId);
  const topicTitle = topicInfo?.data.title;
  const { profile } = useUserProfile();

  const [modalVisible, setModalVisible] = useState(false);

  const { data: item, isLoading: loading, isError, error, refetch } = useQuery({
    queryKey: ['resource', topicId, resourceId],
    queryFn: () => ResourceService.fetchResourceById(topicId, resourceId),
    enabled: !!resourceId && !!topicId,
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

  const handleEditResource = () => {
    setModalVisible(false);
    router.push({
      pathname: '/topics/[topicId]/resources/edit-resource',
      params: {
        topicId: topicId,
        resourceId: resourceId
      }
    });
  };

  const handleDeleteResource = async (): Promise<boolean> => {
    if (!topicId || !resourceId) return false;
    
    const result = await ResourceService.deleteResource(topicId, resourceId);
    
    if (result && (result.status === 200 || result.status === 204)) {
      // Invalidate resources queries to refresh the feed
      queryClient.invalidateQueries({ queryKey: ['resources'] });
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
        <Text>{error ? 'Erro ao carregar recurso' : 'Recurso não encontrado.'}</Text>
      </View>
    );
  }


  return (
      <View style={styles.fullScreenContainer}>
        <ScreenHeader 
          title={topicTitle || ''} 
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
        
        <View style={styles.resourceHeaderRow}>
            <View style={styles.profileSection}>
            <CustomProfileImage 
              source={item.posterProfilePicUrl}
              fullName={item.posterName || 'Usuário'}
              style={styles.profilePic}
            />
            <Text style={styles.posterName}>{item.posterName || 'Usuário'}</Text>
            </View>
            <View >
                <Text style={styles.hourText}>
                    {new Date(item.createdAt || '').toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Text style={styles.dateText}>
                    {new Date(item.createdAt || '').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
                </Text>
            </View>
        </View>

      <ScrollView 
      style={{ flex: 1 }} 
      contentContainerStyle={[styles.contentArea, { paddingBottom: insets.bottom + 20}]} 
      showsVerticalScrollIndicator={false}
      >
          <View style={styles.resourceHeader}>
              <Text style={styles.resourceTitle}>{item.title}</Text>
              {item.description && (
                  <Text style={styles.descriptionText}>{item.description}</Text>
              )}
          </View>

           {item.files && item.files.length > 0 && (
             <View style={styles.filesContainer}>
               {item.files.map((file, index) => (
                 <FileCard 
                   key={index} 
                   file={file} 
                   resourceId={item.id}
                   fileId={file.id.toString()}
                   topicId={topicId}
                 />
               ))}
             </View>
           )}
      </ScrollView>

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
      </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: Colors.light.background[95],
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: Colors.light.background[90],
  },
  resourceHeaderRow: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 20,
    paddingTop: 12,
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
    gap: 20,
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  resourceHeader: {
    gap: 12,
  },
  resourceTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 24,
    lineHeight: 32,
    color: Colors.light.text[5],
  },
  descriptionText: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
    color: Colors.light.text[5],
    lineHeight: 24,
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
  filesContainer: {
    gap: 12,
  },
  filesTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: Colors.light.text[5],
    marginBottom: 8,
  },
});
