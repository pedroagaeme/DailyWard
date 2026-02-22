import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetModal } from './BottomSheetModal';
import { IconButton } from './IconButton';
import { VerticalEllipsisIcon } from '@/assets/images/vertical-ellipsis-icon';
import { BottomSheetButton } from './BottomSheetButton';
import { ParticipantService } from '@/services/participantService';
import { useQueryClient } from '@tanstack/react-query';
import { ParticipantsFeedItem } from '@/types';
import { useFeedAreaContextSafe } from '@/contexts/feedAreaContext';

interface ParticipantBottomSheetProps {
  participant: ParticipantsFeedItem;
  topicId: string;
  buttonStyle?: any;
  borders?: { left?: boolean; right?: boolean; top?: boolean; bottom?: boolean };
  getItemHeight?: () => number;
}

export function ParticipantBottomSheet({ 
  participant, 
  topicId, 
  buttonStyle, 
  borders = { right: true, top: true },
  getItemHeight,
}: ParticipantBottomSheetProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { bottom: bottomPadding } = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const isAdmin = participant.role === 'admin';
  const feedAreaContext = useFeedAreaContextSafe();
  const onItemAboutToDelete = feedAreaContext?.onItemAboutToDelete;

  const handleEllipsisPress = () => {
    setModalVisible(true);
  };

  const handleKickOut = async () => {
    Alert.alert(
      'Remover Participante',
      `Tem certeza que deseja remover ${participant.userFullName} deste tópico?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => {
            // Increase padding by item height before deletion
            if (getItemHeight && onItemAboutToDelete) {
              const itemHeight = getItemHeight();
              if (itemHeight > 0) {
                onItemAboutToDelete(itemHeight);
              }
            }

            const result = await ParticipantService.removeParticipant(topicId, participant.id);
            
            if (result && (result.status === 200 || result.status === 204)) {
              // Invalidate participants queries to refresh the list
              queryClient.invalidateQueries({ queryKey: ['participants', topicId] });
              setModalVisible(false);
            } else {
              Alert.alert('Erro', 'Não foi possível remover o participante. Tente novamente.');
            }
          }
        }
      ]
    );
  };

  const handleToggleAdmin = async () => {
    const newRole = isAdmin ? 'member' : 'admin';
    const action = isAdmin ? 'remover como administrador' : 'promover a administrador';
    
    Alert.alert(
      isAdmin ? 'Remover Administrador' : 'Promover a Administrador',
      `Tem certeza que deseja ${action} ${participant.userFullName}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: isAdmin ? 'Remover' : 'Promover',
          onPress: async () => {
            const result = await ParticipantService.updateParticipantRole(topicId, participant.id, newRole);
            
            if (result && (result.status === 200 || result.status === 204)) {
              // Invalidate participants queries to refresh the list
              queryClient.invalidateQueries({ queryKey: ['participants', topicId] });
              setModalVisible(false);
            } else {
              Alert.alert('Erro', `Não foi possível ${action}. Tente novamente.`);
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
            onPress={handleToggleAdmin}
            label={isAdmin ? 'Remover administrador' : 'Promover a administrador'}
          />
          <BottomSheetButton 
            onPress={handleKickOut}
            label="Remover participante"
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

