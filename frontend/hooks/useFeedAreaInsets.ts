import { InsetToggle, navbarMaxHeight } from "@/constants/HeightInsets";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
    immersiveScreen:InsetToggle, 
    fadedEdges:InsetToggle, 
    overlayHeight:number,
    navbarInset:boolean
}

export function useFeedAreaInsets({immersiveScreen, fadedEdges, overlayHeight, navbarInset}:Props) {
    const insets = useSafeAreaInsets();
    const topInset = Math.max((immersiveScreen.top ? insets.top : 0), (fadedEdges.top ? overlayHeight: 0));
    const bottomInset = Math.max((immersiveScreen.bottom ? (insets.bottom + (navbarInset ? navbarMaxHeight : 0)) : 0), (fadedEdges.bottom ? overlayHeight: 0));
    return {top:topInset, bottom:bottomInset};
}