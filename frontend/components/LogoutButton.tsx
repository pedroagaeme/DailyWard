import { LogoutIcon } from "@/assets/images/logout-icon";
import { IconButton } from '@/components/IconButton';
import { useAuth } from "@/contexts";

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
        <IconButton 
        onPress={handlePress} 
        borders={{left: true, top: true}} outerboxRadius={10} 
        innerSize={24} 
        >
            <LogoutIcon width={24} height={24} />
        </IconButton>
    );
}