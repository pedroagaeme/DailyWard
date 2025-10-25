import { SvgProps } from "react-native-svg";
import { ViewStyle } from "react-native";
import { FastImageProps } from "react-native-fast-image";

// Tab icon interface
export interface TabIconInfo {
  name: string;
  Icon: (props: SvgProps) => React.JSX.Element;
}

// Height insets interface
export interface InsetToggle {
  top: boolean;
  bottom: boolean;
}

export interface HeightInsets {
  top: number;
  bottom: number;
}

// Segmented date interface
export interface SegmentedDate {
  monthYear: string;
  day: string;
  weekday: string | null;
}

// Custom image interfaces
export interface CustomImageViewProps {
  containerStyle?: ViewStyle;
  showOverlay?: boolean;
  overlayStyle?: ViewStyle;
}

export interface CustomImageProps extends Omit<FastImageProps, 'source'>, CustomImageViewProps {
  source: string | null | undefined;
  fallbackSource?: any; // For require() imports
  expandable?: boolean; // Enable image expansion modal
}

export interface CustomProfileImageProps extends Omit<CustomImageProps, 'source'> {
  source?: string | null | undefined;
  fullName: string;
}
