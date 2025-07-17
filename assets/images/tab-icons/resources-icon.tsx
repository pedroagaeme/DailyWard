import Svg, { Path, SvgProps } from "react-native-svg";
export const ResourcesIcon = (props:SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M9 3V18H12V3H9ZM12 5L16 18L19 17L15 4L12 5ZM5 5V18H8V5H5ZM3 19V21H21V19H3Z"
      fill="#EDEDED"
    />
  </Svg>
);
