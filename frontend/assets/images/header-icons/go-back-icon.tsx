import { Colors } from "@/constants/Colors";
import Svg, { Path, SvgProps } from "react-native-svg";
export const GoBackIcon = (props:SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M9.57 5.93005L3.5 12.0001L9.57 18.0701"
      stroke="#171717"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.5 12H3.67"
      stroke="#171717"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
