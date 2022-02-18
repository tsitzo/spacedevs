import React, { useContext } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { SettingsContext } from "../context/SettingsContext";
import { LaunchType } from "../types/settings";
import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";
import Typography from "../components/text/Typography";

const SettingsLaunchesScreen = () => {
  const { colors } = useTheme();
  const { launchType, selectLaunchType } = useContext(SettingsContext);

  const launchTypes: LaunchType[] = ["previous", "upcoming"];

  return (
    <SafeArea>
      <ScrollView style={styles.scrollView}>
        <Typography color="subtext" size={12}>
          Choose default launch filter for the Launches screen.
        </Typography>

        <Spacer y={20} />

        <View
          style={[styles.optionContainer, { backgroundColor: colors.card }]}
        >
          {launchTypes.map((item, index) => (
            <View
              key={index}
              style={[
                styles.selectionTile,
                {
                  borderBottomColor: colors.separator,
                  borderBottomWidth: index + 1 < launchTypes.length ? 0.17 : 0,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => selectLaunchType(item)}
                style={styles.selectionTileContent}
              >
                <Typography
                  variant={launchType === item ? "bold" : "regular"}
                  style={styles.capitalize}
                >
                  {item}
                </Typography>
                {launchType === item && (
                  <Ionicons name="checkmark" color={colors.primary} size={18} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default SettingsLaunchesScreen;

const styles = StyleSheet.create({
  scrollView: { padding: 15 },
  optionContainer: { paddingHorizontal: 15, borderRadius: 10 },
  selectionTile: {
    paddingVertical: 15,
  },
  selectionTileContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  capitalize: { textTransform: "capitalize" },
});
