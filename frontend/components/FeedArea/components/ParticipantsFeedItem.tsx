import { View, ListRenderItem, StyleSheet, Text, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { CustomProfileImage } from '@/components/CustomImage';
import { ParticipantsFeedItem } from '@/types';
import { ParticipantBottomSheet } from '@/components/ParticipantBottomSheet';
import { useTopicInfo } from '@/hooks/useTopicInfo';
import { useGlobalSearchParams } from 'expo-router';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useRef } from 'react';

function ParticipantsFeedItemButton({item}: {item: ParticipantsFeedItem}) {
  const { topicId } = useGlobalSearchParams();
  const { data: topicInfo } = useTopicInfo(topicId as string || '');
  const { profile } = useUserProfile();
  const isLoggedInUserAdmin = topicInfo?.data?.isLoggedInUserAdmin === true;
  const isCurrentUser = item.user?.toString() === profile?.id?.toString();
  const itemHeightRef = useRef<number>(0);

  return (
    <View 
      style={styles.card}
      onLayout={(event) => {
        itemHeightRef.current = event.nativeEvent.layout.height;
      }}
    >
      <View style={styles.row}>
        <CustomProfileImage 
          source={item.userProfilePic} 
          fullName={item.userFullName}
          style={styles.profilePic} 
        />
        <View style={styles.textSection}>
          <Text style={styles.fullName}>{item.userFullName}</Text>
        </View>
        {isLoggedInUserAdmin && !isCurrentUser && (
          <Pressable onPress={(e) => e.stopPropagation()}>
            <ParticipantBottomSheet 
              participant={item} 
              topicId={topicId as string}
              borders={{right: true, top: true}}
              getItemHeight={() => itemHeightRef.current}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export const renderParticipantsFeedItem: ListRenderItem<ParticipantsFeedItem> = ({item}) => (
  <ParticipantsFeedItemButton item={item} />
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginTop: 16,
    paddingHorizontal: 16,
  },
  row: {
    flexShrink: 1,  
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  profilePic: {
    backgroundColor: Colors.light.background[80],
    width: 44,
    height: 44,
    borderRadius: 50,
  },
  textSection: {
    flexShrink: 1,
    flex: 1,
    justifyContent: 'center',
  },
  fullName: {
    flexShrink: 1,
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.light.text[5],
  },
});