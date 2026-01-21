import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DEMOS = [
  {
    title: "Skia Demo",
    description: "Animated blur circles with gradients.",
    href: "/skia/demo",
  },
  {
    title: "Skia Bars",
    description: "Gradient bars with rounded corners.",
    href: "/skia/bars",
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const backgroundColor = Colors[colorScheme].background;
  const cardBackground = colorScheme === "dark" ? "#1f2937" : "#f8fafc";
  const cardBorder = colorScheme === "dark" ? "#334155" : "#e2e8f0";

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Skia Gallery</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedText type="subtitle">Demos</ThemedText>
        {DEMOS.map((demo) => (
          <Link key={demo.href} href={demo.href as any} asChild>
            <Pressable
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: cardBackground, borderColor: cardBorder },
                pressed && styles.cardPressed,
              ]}>
              <ThemedText type="defaultSemiBold">{demo.title}</ThemedText>
              <ThemedText
                lightColor="#4b5563"
                darkColor="#cbd5f5"
                style={styles.cardDescription}>
                {demo.description}
              </ThemedText>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    gap: 16,
    padding: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    gap: 6,
    padding: 16,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  cardDescription: {
    lineHeight: 20,
  },
});
