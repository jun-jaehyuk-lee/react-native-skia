import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";

const JS_WORK_UNITS = 6000;

function now() {
  if (typeof globalThis.performance?.now === "function") {
    return globalThis.performance.now();
  }
  return Date.now();
}

function useRafStats(enabled: boolean, workUnits: number) {
  const [fps, setFps] = useState(0);
  const [avgFrameMs, setAvgFrameMs] = useState(0);
  const [uptime, setUptime] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) {
      startRef.current = null;
      setFps(0);
      setAvgFrameMs(0);
      setUptime(0);
      return;
    }

    let frameCount = 0;
    let lastFpsTime = now();
    startRef.current = lastFpsTime;
    let rafId = 0;

    const loop = () => {
      const current = now();
      frameCount += 1;

      if (workUnits > 0) {
        let acc = 0;
        for (let i = 0; i < workUnits; i += 1) {
          acc += Math.sqrt(i * 13.37);
        }
        void acc;
      }

      if (current - lastFpsTime >= 1000) {
        const elapsed = current - lastFpsTime;
        setFps(Math.round((frameCount * 1000) / elapsed));
        setAvgFrameMs(Number((elapsed / frameCount).toFixed(2)));
        if (startRef.current !== null) {
          setUptime(Math.round((current - startRef.current) / 1000));
        }
        frameCount = 0;
        lastFpsTime = current;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [enabled, workUnits]);

  return { fps, avgFrameMs, uptime };
}

export default function ExploreScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const cardBackground = useThemeColor(
    { light: "#f8fafc", dark: "#111827" },
    "background"
  );
  const cardBorder = useThemeColor(
    { light: "#e2e8f0", dark: "#1f2937" },
    "background"
  );
  const accent = useThemeColor({}, "tint");

  const [isRunning, setIsRunning] = useState(true);
  const [simulateLoad, setSimulateLoad] = useState(false);
  const renderCount = useRef(0);
  renderCount.current += 1;

  const workUnits = simulateLoad ? JS_WORK_UNITS : 0;
  const { fps, avgFrameMs, uptime } = useRafStats(isRunning, workUnits);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title">Performance</ThemedText>
          <ThemedText lightColor="#64748b" darkColor="#94a3b8">
            Live JS frame stats and quick stress switches.
          </ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Live Metrics</ThemedText>
          <View style={styles.statsGrid}>
            <View
              style={[
                styles.statCard,
                { backgroundColor: cardBackground, borderColor: cardBorder },
              ]}>
              <ThemedText type="defaultSemiBold">FPS</ThemedText>
              <ThemedText style={styles.statValue}>
                {isRunning ? fps : "--"}
              </ThemedText>
              <ThemedText lightColor="#94a3b8" darkColor="#64748b">
                avg
              </ThemedText>
            </View>
            <View
              style={[
                styles.statCard,
                { backgroundColor: cardBackground, borderColor: cardBorder },
              ]}>
              <ThemedText type="defaultSemiBold">Frame (ms)</ThemedText>
              <ThemedText style={styles.statValue}>
                {isRunning ? avgFrameMs : "--"}
              </ThemedText>
              <ThemedText lightColor="#94a3b8" darkColor="#64748b">
                avg
              </ThemedText>
            </View>
            <View
              style={[
                styles.statCard,
                { backgroundColor: cardBackground, borderColor: cardBorder },
              ]}>
              <ThemedText type="defaultSemiBold">Uptime</ThemedText>
              <ThemedText style={styles.statValue}>
                {isRunning ? `${uptime}s` : "--"}
              </ThemedText>
              <ThemedText lightColor="#94a3b8" darkColor="#64748b">
                sampling
              </ThemedText>
            </View>
            <View
              style={[
                styles.statCard,
                { backgroundColor: cardBackground, borderColor: cardBorder },
              ]}>
              <ThemedText type="defaultSemiBold">Renders</ThemedText>
              <ThemedText style={styles.statValue}>{renderCount.current}</ThemedText>
              <ThemedText lightColor="#94a3b8" darkColor="#64748b">
                view
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Sampling</ThemedText>
          <View
            style={[
              styles.controlRow,
              { backgroundColor: cardBackground, borderColor: cardBorder },
            ]}>
            <View style={styles.controlText}>
              <ThemedText type="defaultSemiBold">Live sampling</ThemedText>
              <ThemedText lightColor="#64748b" darkColor="#94a3b8">
                Start or stop RAF sampling.
              </ThemedText>
            </View>
            <Switch
              value={isRunning}
              onValueChange={setIsRunning}
              trackColor={{ false: cardBorder, true: accent }}
            />
          </View>
          <View
            style={[
              styles.controlRow,
              { backgroundColor: cardBackground, borderColor: cardBorder },
            ]}>
            <View style={styles.controlText}>
              <ThemedText type="defaultSemiBold">Simulate JS load</ThemedText>
              <ThemedText lightColor="#64748b" darkColor="#94a3b8">
                Adds math work each frame.
              </ThemedText>
            </View>
            <Switch
              value={simulateLoad}
              onValueChange={setSimulateLoad}
              trackColor={{ false: cardBorder, true: accent }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Notes</ThemedText>
          <ThemedText lightColor="#64748b" darkColor="#94a3b8">
            Use the Home tab to open specific Skia demos and compare performance.
          </ThemedText>
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
    gap: 6,
  },
  section: {
    gap: 12,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    borderRadius: 16,
    borderWidth: 1,
    flexGrow: 1,
    gap: 6,
    minWidth: 140,
    padding: 16,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
  },
  controlRow: {
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  controlText: {
    flex: 1,
    gap: 4,
    paddingRight: 12,
  },
});
