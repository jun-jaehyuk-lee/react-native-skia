import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { SkiaBars } from "@/components/skia-bars";
import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function SkiaBarsScreen() {
  const backgroundColor = useThemeColor({}, "background");

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title">Skia Bars</ThemedText>
          <ThemedText lightColor="#4b5563" darkColor="#cbd5f5">
            Gradient bars with rounded corners.
          </ThemedText>
        </View>
        <View style={styles.canvasContainer}>
          <SkiaBars />
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
