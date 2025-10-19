import { AddContactsButton } from "@/components/AddContactsButton";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { TopicCodeArea } from "@/components/TopicCodeArea";
import { AdminIcon } from "@/assets/images/admin-icon";
import { AdminParticipants } from "@/components/AdminParticipants";
import { ParticipantsIcon } from "@/assets/images/participants-icon";
import { renderParticipantsFeedItem } from "@/components/FeedArea/components/ParticipantsFeedItem";
import { ParticipantsFeedItem } from "@/types";
import { FeedArea } from "@/components/FeedArea";
import { useTopics } from "@/contexts";
import { useInfiniteParticipants } from "@/hooks/useInfiniteParticipants";

function ParticipantsHeader({participants}: {participants: ParticipantsFeedItem[]}) {
  const adminParticipants = participants.filter(p => p.role === 'admin');
  return (
    <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Participantes</Text>
          <TopicCodeArea />
        </View>
        <View style={styles.section}>
          <View style={styles.row}>
            <AdminIcon width={28} height={28} />
            <Text style={styles.subsectionTitle}>Administradores</Text>
          </View>
          <AdminParticipants participants={adminParticipants} />
        </View>
        <View style={styles.section}>
            <View style={styles.row}>
              <ParticipantsIcon width={28} height={28} />
              <Text style={styles.subsectionTitle}>Todos os Participantes</Text>
            </View>
        </View>
        
      </View>
    </ScrollView>
  );
}


export default function Participants() {
  const { topicState } = useTopics();
  const topicId = topicState?.id;

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteParticipants({
    topicId: topicId || '',
    enabled: !!topicId,
  });

  // Flatten all pages of data
  const participants = data?.pages.flatMap((page: any) => page.data) || [];

  return (
    <View style={styles.container}>
      <FeedArea 
        items={participants} 
        renderItem={renderParticipantsFeedItem}
        listHeaderComponent={<ParticipantsHeader participants={participants} />}
        fadedEdges={{top: false, bottom: false}}
        immersiveScreen={{top: false, bottom: true}}
        additionalPadding={{top: 0, bottom: 20}}
        noHorizontalPadding={true}
        navbarInset={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.light.background[100],
    overflow: 'visible'
  },
  header: {
    paddingHorizontal:16,
    alignItems:'flex-start',
    paddingTop:8,
    gap:24,
    paddingBottom:32,
  },
  section: {
  },
  sectionTitle: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 4,
    color: Colors.light.text[5],
  },
  row: {
    paddingHorizontal:16,
    flexDirection:'row',
    alignItems:'center',
    gap:8,
  },
  subsectionTitle: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.5,
    color: Colors.light.text[5],
  },
  text: {
    fontFamily:'Inter_500Medium',
    fontSize: 18,
    lineHeight:20,
    color: Colors.light.text[30],
    },
    shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});