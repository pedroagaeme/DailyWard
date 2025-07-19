import Svg, { Path, SvgProps } from "react-native-svg";
export const ColapsibleIcon = (props:SvgProps) => (
  <Svg
    width={35}
    height={35}
    viewBox="0 0 35 35"
    fill="none"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5521 10.6356C14.1217 10.0661 15.045 10.0661 15.6145 10.6356L21.4479 16.469C22.0174 17.0385 22.0174 17.9618 21.4479 18.5314L15.6145 24.3647C15.045 24.9342 14.1217 24.9342 13.5521 24.3647C12.9826 23.7952 12.9826 22.8718 13.5521 22.3023L18.3543 17.5002L13.5521 12.698C12.9826 12.1285 12.9826 11.2051 13.5521 10.6356Z"
      fill="#5D839A"
    />
  </Svg>
);
