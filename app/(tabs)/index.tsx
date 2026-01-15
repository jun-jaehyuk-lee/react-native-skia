import { ScrollView, StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import { SkiaDemo } from "@/components/skia-demo";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Skia on Web & App!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Skia Demo</ThemedText>
          <SkiaDemo />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            {`When you're ready, run `}
            <ThemedText type="defaultSemiBold">
              npm run reset-project
            </ThemedText>{" "}
            to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{" "}
            directory. This will move the current{" "}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
