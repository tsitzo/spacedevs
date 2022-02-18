import React, { useContext } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { SettingsContext } from "../context/SettingsContext";
import { Themes } from "../types/settings";
import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";
import Typography from "../components/text/Typography";

const SettingsThemeScreen = () => {
  const { colors } = useTheme();
  const { theme, selectTheme } = useContext(SettingsContext);

  const themes: Themes[] = ["automatic", "dark", "light"];

  return (
    <SafeArea>
      <ScrollView style={styles.scrollView}>
        <Typography color="subtext" size={12}>
          Choose your preferred app look.
        </Typography>
        <Spacer y={5} />
        <Typography color="subtext" size={12}>
          Automatic will detect the system color scheme and set the app
          accordingly.
        </Typography>

        <Spacer y={20} />

        <View
          style={[styles.optionContainer, { backgroundColor: colors.card }]}
        >
          {themes.map((item, index) => (
            <View
              key={index}
              style={[
                styles.selectionTile,
                {
                  borderBottomColor: colors.separator,
                  borderBottomWidth: index + 1 < themes.length ? 0.17 : 0,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => selectTheme(item)}
                style={styles.selectionTileContent}
              >
                <Typography
                  variant={theme === item ? "bold" : "regular"}
                  style={styles.capitalize}
                >
                  {item}
                </Typography>
                {theme === item && (
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

export default SettingsThemeScreen;

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
