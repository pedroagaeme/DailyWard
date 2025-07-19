import { InsetToggle, navbarMaxHeight } from "@/constants/HeightInsets";
import { useSafeAreaInsets } from "react-native-safe-area-context";


export function useFeedAreaInsets({immersiveScreen, fadedEdges, overlayHeight}:{immersiveScreen:InsetToggle, fadedEdges:InsetToggle, overlayHeight:number}) {
    const insets = useSafeAreaInsets();
    const topInset = Math.max((immersiveScreen.top ? insets.top : 0), (fadedEdges.top ? overlayHeight: 0));
    const bottomInset = Math.max((immersiveScreen.bottom ? (insets.bottom + navbarMaxHeight) : 0), (fadedEdges.bottom ? overlayHeight: 0));
    return {top:topInset, bottom:bottomInset};
}