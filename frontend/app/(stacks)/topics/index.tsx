import { FeedArea } from '@/components/FeedArea';
import { renderHomeFeedItem } from '@/components/FeedArea/components/HomeFeedItem';
import { HomeFeedItem } from '@/types';
import { Colors } from '@/constants/Colors';
import { ActivityIndicator, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useInfiniteTopics } from '@/hooks/useInfiniteTopics';
import { useMemo, useState } from 'react';
import { BottomSheetModal } from '@/components/BottomSheetModal';
import { AddIcon } from '@/assets/images/add-icon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRefreshOnFocus } from '@/hooks/useRefreshOnFocus';
import { HomeHeader } from '@/components/HomeHeader';
import { IconButton } from '@/components/IconButton';
import { BottomSheetButton } from '@/components/BottomSheetButton';
import { router } from 'expo-router';

export default function Home() {
  const [ModalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteTopics({
    enabled: true,
  });
  useRefreshOnFocus(refetch);
  // Flatten all pages of data
  const topics = useMemo(() => data?.pages.flatMap((page: any) => page.results) || [], [data]);
  return (
    <View style={styles.container}>
      <HomeHeader />
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
        fadedEdges={{top:false, bottom:false}}
        additionalPadding={{top:12, bottom:0}}
        numColumns={2}
        refreshControl={<RefreshControl refreshing={isFetchingNextPage} onRefresh={refetch} tintColor={Colors.light.primary} />}
        onEndReachedThreshold={0.2}
        onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              color="blue"
              size="small"
              style={{ marginBottom: 5 }}
            />
          ) : null
        }
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
    backgroundColor: Colors.light.background[90],
    overflow: 'visible',
    gap:12,
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
    fontFamily: 'Inter_400Regular',
    fontSize:16,
    color:  Colors.light.text[30],
  },
  feedTitleText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize:24,
    lineHeight: 28,
    color: Colors.light.text[5],
  },
  profilePic: {
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
