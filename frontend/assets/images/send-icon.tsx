import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const SendIcon = (props:SvgProps) => (
   <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M9.50978 4.22989L18.0698 8.50989C21.9098 10.4299 21.9098 13.5699 18.0698 15.4899L9.50978 19.7699C3.74978 22.6499 1.39978 20.2899 4.27978 14.5399L5.14978 12.8099C5.36978 12.3699 5.36978 11.6399 5.14978 11.1999L4.27978 9.45989C1.39978 3.70989 3.75978 1.34989 9.50978 4.22989Z"
      stroke="#f4f4f4"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.43994 12H10.8399"
      stroke="#f4f4f4"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
