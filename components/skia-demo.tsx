import {
  BlurMask,
  Canvas,
  Circle,
  Group,
  LinearGradient,
  vec,
} from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export function SkiaDemo() {
  const { width } = useWindowDimensions();
  const size = width - 64;
  const r = useSharedValue(20);

  useEffect(() => {
    r.value = withRepeat(
      withTiming(size / 3, {
        duration: 2000,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true
    );
  }, [r, size]);

  const circleR = useDerivedValue(() => r.value);

  return (
    <Canvas style={{ width: size, height: size }}>
      <Group>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(size, size)}
          colors={["#61dafb", "#bb86fc", "#03dac6"]}
        />
        <Circle cx={size / 2} cy={size / 2} r={circleR}>
          <BlurMask blur={20} style="normal" />
        </Circle>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={circleR.value / 2}
          color="white"
        />
      </Group>
    </Canvas>
  );
}
