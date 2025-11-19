import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// Extremely lightweight sparkline line-chart (0..1 y-range)
export default function MiniTrendChart({
  data,
  width = 160,
  height = 40,
}: {
  data: number[];
  width?: number;
  height?: number;
}) {
  if (!data || data.length === 0) {
    return <View style={{ width, height }} />;
  }

  const maxX = data.length - 1;
  const toX = (i: number) => (i / maxX) * width;
  const toY = (v: number) => height - v * height;
  const d = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');

  return (
    <Svg width={width} height={height}>
      <Path d={d} strokeWidth={2} stroke="#38BDF8" fill="none" />
    </Svg>
  );
}
