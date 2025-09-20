import Svg, { Path, SvgProps } from "react-native-svg";
export const AddIcon = (props:SvgProps) => (
   <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M6 12H18"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 18V6"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>)