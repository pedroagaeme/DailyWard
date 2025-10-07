import { InviteCodeIcon } from "@/assets/images/invite-code-icon";
import { Colors } from "@/constants/Colors";
import { View, StyleSheet, Text } from "react-native";

export function TopicCodeArea() {
    return (
        <View style={[styles.card, styles.cardShadow]}>
            <InviteCodeIcon height={70} width={70} />
            <View style={styles.textSection}>
                <Text style={styles.sectionTitle}>Código de Convite:</Text>
                <Text style={styles.codeText}>XJ9K-2LMN</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical:24,
        paddingRight:32,
        gap:12,
        backgroundColor: Colors.light.background[100],
        borderRadius: 20,
    },
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    textSection: {
        gap:8,
    },
    sectionTitle: {
        fontFamily:'Inter_500Medium',
        fontSize: 16,
        lineHeight: 20,
        color: Colors.light.text[30],
        letterSpacing: 1,
    },
    codeText: {
        fontFamily:'Inter_700Bold',
        fontSize: 28,
        lineHeight: 28,
        color: Colors.light.text[5],
        letterSpacing: 2,
    }
});