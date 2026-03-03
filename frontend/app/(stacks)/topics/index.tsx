import { FeedArea } from '@/components/FeedArea';
import { renderHomeFeedItem } from '@/components/FeedArea/components/HomeFeedItem';
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
import { ProfileSection } from '@/components/ProfileSection';

export default function Home() {
  const [ModalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

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

  const topics = useMemo(() => data || [], [data]);
  console.log('Fetched topics:', topics);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <HomeHeader />
        <ProfileSection showGreeting={false} />
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
        <ProfileSection showGreeting={false} />
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
      <ProfileSection showGreeting={true} />
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
  feedTitleText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize:24,
    lineHeight: 28,
    color: Colors.light.text[5],
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
