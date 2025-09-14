import { Colors } from '@/constants/Colors';
import { InviteToContactsIcon } from "@/assets/images/invite-to-contacts";
import { View, StyleSheet, Text, FlatList} from 'react-native';

interface AdminParticipant {
    name: string;
    profilePicUrl?: string;
}

export function AdminParticipants() {
    const participants: AdminParticipant[] = [
        { name: 'John Doe', profilePicUrl: 'https://example.com/john.jpg' },
        { name: 'Jane Smith', profilePicUrl: 'https://example.com/jane.jpg' },
    ];

    const renderAdminParticipant = ({ item }: { item: AdminParticipant }) => (
        <View style={styles.card}>
            <View style={styles.profilePic} />
            <Text style={styles.text} numberOfLines={2}>{item.name}</Text>
            <InviteToContactsIcon width={24} height={24} />
        </View>
    );
    return (
        <FlatList
            data={participants}
            renderItem={renderAdminParticipant}
            keyExtractor={(item) => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    card: {
        overflow: 'hidden',
        alignItems: 'center',
        width: 128,
        gap:12,
        backgroundColor: Colors.light.background[100],
        borderRadius: 24,
        paddingBottom: 24,
        borderWidth: 1,
        borderColor: Colors.light.background[90],
    },
    text: {
        marginHorizontal: 20,
        marginBottom: 4,
        textAlign: 'center',
        fontFamily: 'Inter_700Bold',
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: 0.25,
        color: Colors.light.text[5],
    },
    profilePic: {
        width: '100%',
        height: 100,
        backgroundColor: Colors.light.background[95],
        borderWidth: 1,
        borderColor: Colors.light.background[90],
    }
})