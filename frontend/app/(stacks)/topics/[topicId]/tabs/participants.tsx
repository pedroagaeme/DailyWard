import { AddContactsButton } from "@/components/AddContactsButton";
import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, RefreshControl } from "react-native";
import { TopicCodeArea } from "@/components/TopicCodeArea";
import { AdminIcon } from "@/assets/images/admin-icon";
import { AdminParticipants } from "@/components/AdminParticipants";
import { ParticipantsIcon } from "@/assets/images/participants-icon";
import { renderParticipantsFeedItem } from "@/components/FeedArea/components/ParticipantsFeedItem";
import { ParticipantsFeedItem } from "@/types";
import { FeedArea } from "@/components/FeedArea";
import { useInfiniteParticipants } from "@/hooks/useInfiniteParticipants";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { useMemo } from "react";
import { ParticipantsHeader } from "@/components/ParticipantsHeader";
import { useRoute } from "@react-navigation/native";
import { useTopicInfo } from "@/hooks/useTopicInfo";
import { useGlobalSearchParams } from "expo-router";

function ParticipantsContent({participants, code}: {participants: ParticipantsFeedItem[], code: string}) {
  const adminParticipants = participants.filter(p => p.role === 'admin');
  return (
    <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TopicCodeArea code={code || ''} />
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
  const globalParams = useGlobalSearchParams();
  const topicId = globalParams.topicId as string || '';
  const { data: topicInfo, isLoading: isTopicInfoLoading, isError: isTopicInfoError, error: topicInfoError } = useTopicInfo(topicId);
  const topicTitle = topicInfo?.data.title;
  const code = topicInfo?.data.code;

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteParticipants({
    topicId: topicId || '',
    enabled: !!topicId,
  });

  useRefreshOnFocus(refetch);
  // Flatten all pages of data and filter out undefined items
  const participants = useMemo(() => data?.pages.flatMap((page: any) => page.results)|| [], [data])  ;

  return (
    <View style={styles.container}>
      <ParticipantsHeader title={topicTitle || 'Carregando...'} />
      <FeedArea 
        data={participants} 
        renderItem={renderParticipantsFeedItem}
        ListHeaderComponent={<ParticipantsContent participants={participants} code={code || ''} />}
        fadedEdges={{top: false, bottom: false}}
        immersiveScreen={{top: false, bottom: true}}
        additionalPadding={{top: 0, bottom: 20}}
        noHorizontalPadding={true}
        navbarInset={true}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.light.background[90],
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
    color: Colors.light.text[5],
  },
  row: {
    paddingHorizontal:16,
    flexDirection:'row',
    alignItems:'center',
    gap:8,
    marginBottom: 8,
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