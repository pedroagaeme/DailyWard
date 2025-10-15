import { Pressable, ViewStyle } from "react-native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { BottomSheetCloseContext } from "./BottomSheetModal";

export function GoToRouteButton({ route, style, children }: { 
    route: string; 
    style: ViewStyle; 
    children: React.ReactNode;
}) {
    const router = useRouter();
    const closeModal = useContext(BottomSheetCloseContext);
    
    const handlePress = () => {
        closeModal();
        router.push(route);
    };
    return (
        <Pressable style={style} onPress={handlePress}>
            {children}
        </Pressable>
    );
}