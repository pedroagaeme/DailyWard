import { Colors } from '@/constants/Colors';
import { View, StyleSheet, Text, FlatList, Dimensions} from 'react-native';
import { CustomProfileImage } from './Image/ImageComponent';
import { ParticipantsFeedItem } from './FeedArea/ParticipantsFeedItem';

export function AdminParticipants({participants}: {participants: ParticipantsFeedItem[]}) {
    const windowWidth = Dimensions.get('window').width;
    const cardWidth = windowWidth / 3 ; 
    const renderAdminParticipant = ({ item }: { item: ParticipantsFeedItem }) => (
        <View style={[styles.card, { width: cardWidth }]}>
            <CustomProfileImage 
                source={item.userProfilePic} 
                fullName={item.userFullName} 
                style={{ ...styles.profilePic, width: cardWidth - 20 }} 
            />
            <Text style={styles.text} numberOfLines={2}>{item.userFullName}</Text>
        </View>
    );
    return (
        <FlatList
            data={participants}
            renderItem={renderAdminParticipant}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginBottom: 24,
        paddingHorizontal:16,
        gap: 16,
    },
    card: {
        overflow: 'hidden',
        alignItems: 'center',
        gap: 12,
        borderColor: Colors.light.background[90],
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0.2,
        color: Colors.light.text[15]
    },
    profilePic: {
        borderRadius: 24,
        aspectRatio: 1,
    }
})