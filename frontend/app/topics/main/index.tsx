import { FeedArea } from '@/components/FeedArea';
import { HomeFeedItem, renderHomeFeedItem } from '@/components/FeedArea/HomeFeedItem';
import { Colors } from '@/constants/Colors';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTopics } from '@/utils/topicsContext';
import { useState } from 'react';
import { BottomSheetModal } from '@/components/BottomSheetModal';
import { AddIcon } from '@/assets/images/add-icon';
import { GoToRouteButton } from '@/components/GoToRouteButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const topics: HomeFeedItem[] = useTopics()?.topics || [];
  const [ModalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.feedTitleText}>Seus Tópicos</Text>
          <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
            <AddIcon width={32} height={32}/>
          </Pressable>
        </View>
      </View>
      <FeedArea 
          items={topics} 
          renderItem={renderHomeFeedItem} 
          immersiveScreen={{top:false, bottom:true}}
          fadedEdges={{top:false, bottom:false}}
          additionalPadding={{top:12, bottom:0}}
          numColumns={2}
      />
      <BottomSheetModal ModalVisible={ModalVisible} setModalVisible={setModalVisible} children={
        <View style={[styles.modal, {paddingBottom: insets.bottom + 20}]}>
          <GoToRouteButton
            route="/topics/join"
            style={{}}
            
          >
            <Text style={styles.modalText}>Entrar em Tópico</Text>
          </GoToRouteButton>
          <GoToRouteButton
            route="/topics/create-topic"
            style={{}}
          >
            <Text style={styles.modalText}>Criar Tópico</Text>
          </GoToRouteButton>
        </View>
      }/>
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
  header: {
    paddingHorizontal:16,
    paddingTop:12,
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
    padding: 24,
    gap: 28,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalText: {
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    color: Colors.light.text[15],
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.light.primary,
    padding: 8,
    gap: 4,
    borderRadius: 24,
    alignItems: 'center',
  },
});
