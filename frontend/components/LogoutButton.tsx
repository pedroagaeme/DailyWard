import { LogoutIcon } from "@/assets/images/logout-icon";
import { useAuth } from "@/contexts";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { Colors } from "@/constants/Colors";

interface LogoutButtonProps {
    onLogoutPress?: () => void;
}

export function LogoutButton({ onLogoutPress }: LogoutButtonProps = {}) {
    const { onLogout } = useAuth();
    
    const handlePress = () => {
        if (onLogoutPress) {
            onLogoutPress();
        } else {
            onLogout!();
        }
    };
    
    return (
        <Pressable onPress={handlePress} style={styles.button}>
            <LogoutIcon width={24} height={24} color={Colors.light.text[5]} />
            <Text style={styles.text}>Sair</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 8,
    },
    text: {
        fontFamily: 'Inter_500Medium',
        fontSize: 16,
        color: Colors.light.text[5],
    },
});