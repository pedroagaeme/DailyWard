import { Pressable } from "react-native";
import { useAuth } from "@/utils/authContext";
import { LogoutIcon } from "@/assets/images/logout-icon";

export function LogoutButton() {
    const { onLogout } = useAuth();

    const handlePress = async () => {
        await onLogout!();
    };
    
    return (
        <Pressable onPress={handlePress} style={{ padding: 10 }}>
            <LogoutIcon width={24} height={24} />
        </Pressable>
    );
}