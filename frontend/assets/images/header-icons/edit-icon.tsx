import Svg, { Path, SvgProps } from "react-native-svg";

interface EditIconProps extends SvgProps {
  color?: string;
}

export const EditIcon = ({ color = "#EDEDED", ...props }: EditIconProps) => (
  <Svg
    width={25}
    height={24}
    viewBox="0 0 25 24"
    fill="none"
    {...props}
  >
    <Path
      d="M13.7601 3.59997L5.5501 12.29C5.2401 12.62 4.9401 13.27 4.8801 13.72L4.5101 16.96C4.3801 18.13 5.2201 18.93 6.3801 18.73L9.6001 18.18C10.0501 18.1 10.6801 17.77 10.9901 17.43L19.2001 8.73997C20.6201 7.23997 21.2601 5.52997 19.0501 3.43997C16.8501 1.36997 15.1801 2.09997 13.7601 3.59997Z"
      stroke={color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.3899 5.05005C12.8199 7.81005 15.0599 9.92005 17.8399 10.2"
      stroke={color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.5 22H21.5"
      stroke={color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
