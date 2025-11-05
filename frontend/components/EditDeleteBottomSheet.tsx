import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import { BottomSheetModal } from './BottomSheetModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetButton } from './BottomSheetButton';

interface EditDeleteBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => Promise<boolean>; // Returns true on success, false on failure
  canEdit?: boolean;
  editLabel?: string;
  deleteLabel?: string;
  deleteTitle?: string;
  deleteMessage?: string;
}

export function EditDeleteBottomSheet({
  visible,
  onClose,
  onEdit,
  onDelete,
  canEdit = true,
  editLabel = 'Editar',
  deleteLabel = 'Deletar',
  deleteTitle = 'Deletar',
  deleteMessage = 'Tem certeza que deseja deletar? Esta ação não pode ser desfeita.',
}: EditDeleteBottomSheetProps) {
  const insets = useSafeAreaInsets();

  const handleDelete = () => {
    Alert.alert(
      deleteTitle,
      deleteMessage,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            const success = await onDelete();
            if (!success) {
              Alert.alert('Erro', 'Não foi possível deletar. Tente novamente.');
            }
          }
        }
      ]
    );
  };

  return (
    <BottomSheetModal ModalVisible={visible} setModalVisible={onClose}>
      <View style={[styles.modalContent, { paddingTop: 8, paddingBottom: insets.bottom + 8, paddingHorizontal: 20 }]}>
        {canEdit && (
          <BottomSheetButton 
            onPress={onEdit}
            label={editLabel}
          />
        )}
        <BottomSheetButton 
          onPress={handleDelete}
          label={deleteLabel}
          isDestructive={true}
        />
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: Colors.light.background[100],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

