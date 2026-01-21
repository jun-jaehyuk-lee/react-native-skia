import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SkiaDemo } from "@/components/skia-demo";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function SkiaDemoScreen() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title">Skia Demo</ThemedText>
          <ThemedText lightColor="#4b5563" darkColor="#cbd5f5">
            Animated blur circles with gradients.
          </ThemedText>
        </View>
        <View style={styles.canvasContainer}>
          <SkiaDemo />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    gap: 20,
    padding: 24,
  },
  header: {
    gap: 8,
  },
  canvasContainer: {
    alignItems: "center",
  },
});
