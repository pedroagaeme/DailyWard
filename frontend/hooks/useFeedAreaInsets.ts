import { InsetToggle, navbarMaxHeight } from "@/constants/HeightInsets";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
    immersiveScreen:InsetToggle, 
    navbarInset:boolean
}

export function useFeedAreaInsets({immersiveScreen, navbarInset}:Props) {
    const insets = useSafeAreaInsets();
    const topInset = immersiveScreen.top ? insets.top : 0;
    const bottomInset = immersiveScreen.bottom ? (insets.bottom + (navbarInset ? navbarMaxHeight : 0)) : 0;
    return {top:topInset, bottom:bottomInset};
}