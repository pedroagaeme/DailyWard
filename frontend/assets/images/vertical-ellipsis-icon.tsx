import React from 'react';
import { Svg, Circle } from 'react-native-svg';

interface VerticalEllipsisIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const VerticalEllipsisIcon = ({ 
  width = 24, 
  height = 24, 
  color = '#000' 
}: VerticalEllipsisIconProps) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="6" r="2" fill={color} />
      <Circle cx="12" cy="12" r="2" fill={color} />
      <Circle cx="12" cy="18" r="2" fill={color} />
    </Svg>
  );
};
