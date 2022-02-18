import React, { useContext } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { SettingsContext } from "../context/SettingsContext";
import { Browsers } from "../types/settings";
import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";
import Typography from "../components/text/Typography";

const SettingsNewsScreen = () => {
  const { colors } = useTheme();
  const { newsSite, selectNewsSite } = useContext(SettingsContext);

  const newsSites = [
    { url: "", name: "All" },
    { url: "nasa.gov", name: "Nasa" },
    { url: "spaceflightnow.com", name: "Spaceflightnow" },
    { url: "teslarati.com", name: "Teslarati" },
    { url: "nasaspaceflight.com", name: "Nasaspaceflight" },
    { url: "spacenews.com", name: "Spacenews" },
    { url: "elonx.net", name: "Elonx" },
    { url: "esa.int", name: "Esa" },
  ];
  return (
    <SafeArea>
      <ScrollView style={styles.scrollView}>
        <Typography color="subtext" size={12}>
          Choose your default news source for the News screen.
        </Typography>

        <Spacer y={20} />

        <View
          style={[styles.optionContainer, { backgroundColor: colors.card }]}
        >
          {newsSites.map((item, index) => (
            <View
              key={index}
              style={[
                styles.selectionTile,
                {
                  borderBottomColor: colors.separator,
                  borderBottomWidth: index + 1 < newsSites.length ? 0.17 : 0,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => selectNewsSite(item.url)}
                style={styles.selectionTileContent}
              >
                <Typography
                  variant={newsSite === item.url ? "bold" : "regular"}
                  style={styles.capitalize}
                >
                  {item.name}
                </Typography>
                {newsSite === item.url && (
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

export default SettingsNewsScreen;

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
