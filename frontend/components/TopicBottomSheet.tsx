import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal } from './BottomSheetModal';
import { IconButton } from './IconButton';
import { VerticalEllipsisIcon } from '@/assets/images/vertical-ellipsis-icon';
import { router } from 'expo-router';
import { BottomSheetButton } from './BottomSheetButton';
import { TopicService } from '@/services/topicService';
import { useQueryClient } from '@tanstack/react-query';
import { useTopicInfo } from '@/hooks/useTopicInfo';

interface TopicBottomSheetProps {
  topicId: string;
  buttonStyle?: any;
  borders?: { left?: boolean; right?: boolean; top?: boolean; bottom?: boolean };
}

export function TopicBottomSheet({ topicId, buttonStyle, borders = { right: true, top: true } }: TopicBottomSheetProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { bottom: bottomPadding } = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { data: topicInfo, isLoading } = useTopicInfo(topicId);
  const isAdmin = (topicInfo?.data?.isLoggedInUserAdmin === true);

  const handleEllipsisPress = () => {
    setModalVisible(true);
  };

  const handleSeeMoreInfo = () => {
    router.push({
      pathname: '/topics/[topicId]/info',
      params: { topicId }
    });
  };

  const handleEditTopic = () => {
    router.push({
      pathname: '/topics/[topicId]/edit',
      params: { topicId }
    });
  };

  const handleExitTopic = async () => {
    Alert.alert(
      'Sair do Tópico',
      'Tem certeza que deseja sair deste tópico? Você não poderá ver mais posts ou recursos deste tópico.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            const result = await TopicService.leaveTopic(topicId);
            
            if (result && (result.status === 200 || result.status === 204)) {
              // Invalidate topic queries to refresh the feed
              queryClient.invalidateQueries({ queryKey: ['topics'] });
              queryClient.invalidateQueries({ queryKey: ['topic', topicId] });
              
              // Navigate back to topics list
              router.push('/topics');
            } else {
              Alert.alert('Erro', 'Não foi possível sair do tópico. Tente novamente.');
            }
          }
        }
      ]
    );
  };

  return (
    <>
      <IconButton 
        onPress={handleEllipsisPress}
        borders={borders} 
        outerboxRadius={10} 
        innerSize={24}
        style={buttonStyle}
      >
        <VerticalEllipsisIcon width={24} height={24} color={Colors.light.text[5]} />
      </IconButton>

      <BottomSheetModal ModalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View style={[styles.modalContent, { paddingTop: 8, paddingBottom: bottomPadding + 8, paddingHorizontal: 20 }]}>
          <BottomSheetButton 
            onPress={handleSeeMoreInfo}
            label="Ver mais informações"
          />
          {isAdmin && (
            <BottomSheetButton 
              onPress={handleEditTopic}
              label="Editar tópico"
            />
          )}
          <BottomSheetButton 
            onPress={handleExitTopic}
            label="Sair do tópico"
            isDestructive={true}
          />
        </View>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Colors.light.background[100],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

