import { View, ListRenderItem, StyleSheet, Text } from 'react-native';
import { Colors } from '@/constants/Colors';
import { CustomProfileImage } from '@/components/CustomImage';
import { ParticipantsFeedItem } from '@/types';
export const renderParticipantsFeedItem: ListRenderItem<ParticipantsFeedItem> = ({item}) => (
  <View style={styles.card}>
    <View style={styles.row}>
      <CustomProfileImage 
        source={item.userProfilePic} 
        fullName={item.userFullName}
        style={styles.profilePic} 
      />
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