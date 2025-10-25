import { router, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { ListRenderItem, StyleSheet, Text, View, Pressable } from 'react-native';
import { CustomImage, CustomProfileImage } from '@/components/CustomImage';
import { TopicFeedItem } from '@/types';
import { VerticalEllipsisIcon } from '@/assets/images/vertical-ellipsis-icon';
import { BottomSheetModal } from '@/components/BottomSheetModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

function TopicFeedItemButton({item}:{item:TopicFeedItem}) {
  const { topicId } = useGlobalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  
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
    console.log('Edit post:', item.id);
  };

  const handleDeletePost = () => {
    setModalVisible(false);
    console.log('Delete post:', item.id);
  };
  
  return(
    <Pressable style={styles.itemContainer} onPress={handlePress}>
      <View style={styles.headerRow}>
        <View style={styles.profileSection}>
          <CustomProfileImage 
            source={item.posterProfilePicUrl} 
            fullName={item.posterName} 
            style={{width:40, borderRadius: 20}}
          />
          <Text style={styles.posterName}>{item.posterName}</Text>
        </View>
        <View style={styles.timeAndOptions}>
          <Text style={styles.hourText}>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          <Pressable onPress={handleEllipsisPress} style={styles.ellipsisButton}>
            <VerticalEllipsisIcon width={20} height={20} color={Colors.light.text[30]} />
          </Pressable>
        </View>
      </View>
      <View style={styles.contentArea}>
      {item.contentText && <Text style={styles.contentText} numberOfLines={3}>{item.contentText}</Text>}
      {item.contentPicUrl && <CustomImage source={item.contentPicUrl} style={styles.contentPic} />}
      </View>
      
      <BottomSheetModal ModalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View style={[styles.modalContent, { paddingTop: 8, paddingBottom: insets.bottom + 8, paddingHorizontal: 20 }]}>
          <Pressable onPress={handleEditPost} style={styles.modalOption}>
            <Text style={styles.modalOptionText}>Editar post</Text>
          </Pressable>
          <Pressable onPress={handleDeletePost} style={styles.modalOption}>
            <Text style={[styles.modalOptionText, styles.deleteOptionText]}>Deletar post</Text>
          </Pressable>
        </View>
      </BottomSheetModal>
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
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
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
    gap: 4,
  },
  ellipsisButton: {
    padding: 8,
    paddingRight:0,
    borderRadius: 4,
  },
  modalContent: {
    backgroundColor: Colors.light.background[100],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  modalOptionText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.light.text[5],
    textAlign: 'center',
  },
  deleteOptionText: {
    color: '#FF3B30',
  },
});