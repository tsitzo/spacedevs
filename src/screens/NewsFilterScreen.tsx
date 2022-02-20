import React, { FC, useContext, useLayoutEffect } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SettingsContext } from "../context/SettingsContext";
import { AppStackParams } from "../types/navigation";
import Typography from "../components/text/Typography";
import SafeArea from "../components/layout/SafeArea";

interface INewsFilterScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "NewsFilterScreen">;
}

const NewsFilterScreen: FC<INewsFilterScreenProps> = ({ navigation }) => {
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-circle" color={colors.primary} size={22} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeArea>
      <StatusBar barStyle="light-content" />
      <ScrollView>
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
                onPress={() => {
                  selectNewsSite(item.url);
                  navigation.goBack();
                }}
                style={styles.selectionTileContent}
              >
                <Typography
                  variant={newsSite === item.url ? "bold" : "regular"}
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

export default NewsFilterScreen;

const styles = StyleSheet.create({
  optionContainer: { margin: 15, paddingHorizontal: 15, borderRadius: 10 },
  textWrapper: { marginHorizontal: 15, marginTop: 10 },

  selectionTile: {
    paddingVertical: 15,
  },
  selectionTileContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
