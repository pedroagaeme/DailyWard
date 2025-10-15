import { View, ListRenderItem, StyleSheet, Text, Image } from 'react-native';
import { FeedItem } from '@/constants/FeedItem';
import { Colors } from '@/constants/Colors';
import { DefaultProfileIcon } from '../DefaultProfileIcon';

//{"id": 2, "joinedAt": "2025-10-08T23:17:26.947351Z", "role": "admin", "user": 1, "userFullName": "Teste Teste", "userProfilePic": null}]
export interface ParticipantsFeedItem extends FeedItem {
  userFullName: string;
  userProfilePic: string;
  role: string;
  joinedAt: string;
}
export const renderParticipantsFeedItem: ListRenderItem<ParticipantsFeedItem> = ({item}) => (
  <View style={styles.card}>
    <View style={styles.row}>
      {item.userProfilePic ? 
        <Image source={{ uri: item.userProfilePic }} style={styles.profilePic} />
        : <DefaultProfileIcon fullName={item.userFullName} />
      }
      <View style={styles.textSection}>
        <Text style={styles.fullName}>{item.userFullName}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profilePic: {
    width: 44,
    height: 44,
    borderRadius: 24,
    backgroundColor: Colors.light.background[90],
    borderWidth: 0.5,
    borderColor: Colors.light.background[70],
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  fullName: {
    fontFamily: 'Inter_500Medium',
    fontSize: 17,
    color: Colors.light.text[30],
  },
  lastMessage: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: Colors.light.text[30],
    opacity: 0.85,
  },
});