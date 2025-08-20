import Svg, { Path, SvgProps } from "react-native-svg";
import { Colors } from "@/constants/Colors";
export const InviteToDiaryIcon = (props:SvgProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      d="M18.5 19.5H14.5"
      stroke={Colors.light.secondary}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.5 21.5V17.5"
      stroke={Colors.light.secondary}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.44997 10.79 7.55997 8.84 7.55997 6.44C7.54997 3.99 9.53997 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z"
      stroke={Colors.light.secondary}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.99 21.8102C10.17 21.8102 8.36004 21.3502 6.98004 20.4302C4.56004 18.8102 4.56004 16.1702 6.98004 14.5602C9.73004 12.7202 14.24 12.7202 16.99 14.5602"
      stroke={Colors.light.secondary}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
