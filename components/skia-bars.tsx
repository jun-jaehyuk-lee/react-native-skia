import {
  Canvas,
  LinearGradient,
  RoundedRect,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import { useWindowDimensions } from "react-native";

const BAR_HEIGHTS = [0.55, 0.9, 0.7, 1, 0.8];
const BAR_COLORS = [
  ["#ff6b6b", "#ffd166"],
  ["#4cc9f0", "#4361ee"],
  ["#43aa8b", "#90be6d"],
  ["#f9844a", "#f9c74f"],
  ["#9d4edd", "#ffb3c1"],
];

export function SkiaBars() {
  const { width } = useWindowDimensions();
  const canvasWidth = width - 64;
  const canvasHeight = 180;
  const gap = 12;
  const barCount = BAR_HEIGHTS.length;
  const barWidth = (canvasWidth - gap * (barCount - 1)) / barCount;

  return (
    <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
      {BAR_HEIGHTS.map((ratio, index) => {
        const barHeight = ratio * (canvasHeight - 8);
        const x = index * (barWidth + gap);
        const y = canvasHeight - barHeight;
        const colors = BAR_COLORS[index % BAR_COLORS.length];

        return (
          <RoundedRect
            key={`bar-${index}`}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            r={12}
          >
            <LinearGradient
              start={vec(x, y)}
              end={vec(x, y + barHeight)}
              colors={colors}
            />
          </RoundedRect>
        );
      })}
    </Canvas>
  );
}
