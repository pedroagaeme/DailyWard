import { AddContactsButton } from "@/components/AddContactsButton";
import { ContactsFeedItem, renderContactsFeedItem } from "@/components/FeedArea/ContactsFeedItem";
import { Colors } from "@/constants/Colors";
import { inviteButtonBottomMargin, inviteButtonMaxHeight, navbarMaxHeight } from "@/constants/HeightInsets";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DiaryCodeArea } from "@/components/DiaryCodeArea";
import { AdminIcon } from "@/assets/images/admin-icon";
import { AdminParticipants } from "@/components/AdminParticipants";
import { ParticipantsIcon } from "@/assets/images/participants-icon";

const sampleData: ContactsFeedItem[] = [
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
    lastMessage: "Amazing sunset at the beach today!"
  },
  {
    name: "John Doe",
  },
];


export default function Contacts() {
    const insets = useSafeAreaInsets();
    const buttonBottomInset = insets.bottom + navbarMaxHeight + inviteButtonBottomMargin;
    const feedAreaAdditionalPadding = inviteButtonBottomMargin + inviteButtonMaxHeight;
    return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Participantes</Text>
        <DiaryCodeArea />
        <AddContactsButton />
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <AdminIcon width={28} height={28} />
          <Text style={styles.subsectionTitle}>Administradores</Text>
        </View>
        <AdminParticipants />
      </View>
      <View style={styles.section}>
          <View style={styles.row}>
            <ParticipantsIcon width={28} height={28} />
            <Text style={styles.subsectionTitle}>Outros Participantes</Text>
          </View>
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: Colors.light.background[100],
    gap:32,
    paddingHorizontal:16,
    overflow: 'visible'
  },
  header: {
    alignItems:'flex-start',
    paddingTop:20,
    gap:24,
    paddingBottom:8,
  },
  section: {
    gap:16,
  },
  sectionTitle: {
    fontFamily:'Inter_600SemiBold',
    fontSize: 24,
    lineHeight: 28,
    marginBottom:8,
    color: Colors.light.text[5],
  },
  row: {
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