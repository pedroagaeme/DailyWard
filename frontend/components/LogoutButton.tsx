import { Pressable } from "react-native";
import { useAuth } from "@/contexts";
import { LogoutIcon } from "@/assets/images/logout-icon";
import { IconButton } from '@/components/IconButton';

export function LogoutButton() {
    const { onLogout } = useAuth();

    const handlePress = async () => {
        await onLogout!();
    };
    
    return (
        <IconButton 
        onPress={handlePress} 
        borders={{left: true, top: true}} outerboxRadius={10} 
        innerSize={24} 
        >
            <LogoutIcon width={24} height={24} />
        </IconButton>
    );
}