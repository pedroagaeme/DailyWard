import { FeedArea } from '@/components/FeedArea';
import { renderHomeFeedItem } from '@/components/FeedArea/components/HomeFeedItem';
import { HomeFeedItem } from '@/types';
import { Colors } from '@/constants/Colors';
import { EmptyState } from '@/components/EmptyState';
import { ActivityIndicator, RefreshControl, StyleSheet, Text, View, Pressable } from 'react-native';
import { useTopics } from '@/hooks/useTopics';
import { useMemo, useState } from 'react';
import { BottomSheetModal } from '@/components/BottomSheetModal';
import { AddIcon } from '@/assets/images/add-icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { HomeHeader } from '@/components/HomeHeader';
import { IconButton } from '@/components/IconButton';
import { BottomSheetButton } from '@/components/BottomSheetButton';
import { router } from 'expo-router';
import { CustomProfileImage } from '@/components/CustomImage';
import { useUserProfile } from '@/hooks/useUserProfile';
import EditIcon from '@/assets/images/edit-icon';

export default function Home() {
  const [ModalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const { profile } = useUserProfile();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useTopics({
    enabled: true,
  });
  useRefreshOnFocus(refetch);
  // Use the topics data directly (non-paginated)
  const topics = useMemo(() => data || [], [data]);
  
  const fullName = `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || 'Usuário';

  if (isLoading) {
    return (
      <View style={styles.container}>
        <HomeHeader />
        <View style={styles.profileSection}>
          <CustomProfileImage
            source={profile?.profilePicUrl || null}
            fullName={fullName}
            style={styles.profilePic}
            expandable={false}
          />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName} numberOfLines={1} ellipsizeMode="tail">{fullName}</Text>
              <IconButton
                onPress={() => router.push('/(stacks)/edit-profile')}
                innerSize={18}
                outerboxRadius={6}
                borders={{ right: true, bottom: true }}
              >
                <EditIcon width={18} height={18} color={Colors.light.primary} />
              </IconButton>
            </View>
            <Pressable onPress={() => router.push('/(stacks)/edit-profile')}>
              <Text style={styles.editProfileText}>Editar perfil</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.topicsHeader}>
          <View style={styles.row}>
            <Text style={styles.feedTitleText}>Seus Tópicos</Text>
            <IconButton 
            onPress={() => setModalVisible(true)} 
            outerboxRadius={10} 
            innerSize={24}
            style={styles.button}>
              <AddIcon width={32} height={32}/>
            </IconButton>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <HomeHeader />
        <View style={styles.profileSection}>
          <CustomProfileImage
            source={profile?.profilePicUrl || null}
            fullName={fullName}
            style={styles.profilePic}
            expandable={true}
          />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName} numberOfLines={1} ellipsizeMode="tail">{fullName}</Text>
              <IconButton
                onPress={() => router.push('/(stacks)/edit-profile')}
                innerSize={18}
                outerboxRadius={6}
                borders={{ right: true, bottom: true }}
              >
                <EditIcon width={18} height={18} color={Colors.light.primary} />
              </IconButton>
            </View>
            <Pressable onPress={() => router.push('/(stacks)/edit-profile')}>
              <Text style={styles.editProfileText}>Editar perfil</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.topicsHeader}>
          <View style={styles.row}>
            <Text style={styles.feedTitleText}>Seus Tópicos</Text>
            <IconButton 
            onPress={() => setModalVisible(true)} 
            outerboxRadius={10} 
            innerSize={24}
            style={styles.button}>
              <AddIcon width={32} height={32}/>
            </IconButton>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <EmptyState title="Ocorreu um erro inesperado" subtitle="Não foi possível carregar seus tópicos. Tente novamente." />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HomeHeader />
      <View style={styles.profileSection}>
        <CustomProfileImage
          source={profile?.profilePicUrl || null}
          fullName={fullName}
          style={styles.profilePic}
          expandable={true}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.greetingsText}>Bem-vindo(a),</Text>
          <View style={styles.nameRow}>
            <Text style={styles.profileName} numberOfLines={1} ellipsizeMode="tail">{fullName}</Text>
            <IconButton
              onPress={() => router.push('/(stacks)/edit-profile')}
              innerSize={20}
              outerboxRadius={12}
              borders={{ right: true, bottom: true }}
            >
              <EditIcon width={20} height={20} color={Colors.light.primary} />
            </IconButton>
          </View>
        </View>
      </View>
      <View style={styles.topicsHeader}>
        <View style={styles.row}>
          <Text style={styles.feedTitleText}>Seus Tópicos</Text>
          <IconButton 
          onPress={() => setModalVisible(true)} 
          outerboxRadius={10} 
          innerSize={24}
          style={styles.button}>
            <AddIcon width={32} height={32}/>
          </IconButton>
        </View>
      </View>
      <FeedArea 
        data={topics} 
        renderItem={renderHomeFeedItem} 
        immersiveScreen={{top:false, bottom:true}}
        additionalPadding={{top:12, bottom: 0}}
        numColumns={2}
        ListEmptyComponent={<EmptyState title="Nenhum tópico" subtitle="Você ainda não tem tópicos. Crie um novo ou entre em um existente!" />}
      />
      <BottomSheetModal ModalVisible={ModalVisible} setModalVisible={setModalVisible}>
        <View style={[styles.modal, {paddingBottom: insets.bottom + 8, paddingTop: 8, paddingHorizontal: 20}]}>
          <BottomSheetButton
            onPress={() => router.push('/topics/join')}
            label="Entrar em Tópico"
          />
          <BottomSheetButton
            onPress={() => router.push('/topics/create-topic')}
            label="Criar Tópico"
          />
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'stretch',
    backgroundColor: Colors.light.background[90],
    overflow: 'visible',
    gap:12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicsHeader: {
    paddingHorizontal:16,
    paddingBottom:0,
    gap:12,
  },
  row: {
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
  },
  greetingsText: {
    fontFamily: 'Inter_500Medium',
    fontSize:14,
    lineHeight: 20,
    color:  Colors.light.text[30],
  },
  feedTitleText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize:24,
    lineHeight: 28,
    color: Colors.light.text[5],
  },
  profileSection: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 16,
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    gap: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18,
    color: Colors.light.text[5],
    flex: 1,
  },
  editProfileText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 14,
    color: Colors.light.primary,
  },
  modal: {
    backgroundColor: Colors.light.background[100],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    backgroundColor: Colors.light.primary,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
  },
});
