import React, { FC, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { SettingsContext } from "../context/SettingsContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AppStackParams } from "../types/navigation";

import Typography from "../components/text/Typography";
import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";

interface ISettingsScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AppTabs">;
}

const SettingsScreen: FC<ISettingsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { theme, browser, launchType, newsSite } = useContext(SettingsContext);
  return (
    <SafeArea>
      <ScrollView>
        <View style={[styles.itemsWrapper, { backgroundColor: colors.card }]}>
          <View
            style={[
              styles.selectionTile,
              styles.selectionTileContent,
              styles.selectionTileBorder,
              {
                borderBottomColor: colors.separator,
              },
            ]}
          >
            <Typography>Notifications</Typography>
            <Switch style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }} />
          </View>

          <View
            style={[
              styles.selectionTile,

              {
                borderBottomColor: colors.separator,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.selectionTileContent}
              onPress={() => navigation.push("SettingsThemeScreen")}
            >
              <Typography>Theme</Typography>
              <View style={styles.chevonWrapper}>
                <Typography color="subtext" style={styles.capitalize}>
                  {theme}
                </Typography>
                <Spacer x={10} />
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.subtext}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.itemsWrapper, { backgroundColor: colors.card }]}>
          <View
            style={[
              styles.selectionTile,
              styles.selectionTileBorder,

              {
                borderBottomColor: colors.separator,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.selectionTileContent}
              onPress={() => navigation.push("SettingsLaunchesScreen")}
            >
              <Typography>Launches</Typography>
              <View style={styles.chevonWrapper}>
                <Typography color="subtext" style={styles.capitalize}>
                  {launchType}
                </Typography>
                <Spacer x={10} />
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.subtext}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.selectionTile,
              styles.selectionTileBorder,

              {
                borderBottomColor: colors.separator,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.selectionTileContent}
              onPress={() => navigation.push("SettingsBrowserScreen")}
            >
              <Typography>Browser</Typography>
              <View style={styles.chevonWrapper}>
                <Typography color="subtext" style={styles.capitalize}>
                  {browser}
                </Typography>
                <Spacer x={10} />
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.subtext}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.selectionTile]}>
            <TouchableOpacity
              style={styles.selectionTileContent}
              onPress={() => navigation.push("SettingsNewsScreen")}
            >
              <Typography>News</Typography>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.subtext}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  itemsWrapper: { margin: 15, paddingHorizontal: 15, borderRadius: 10 },
  selectionTile: {
    paddingVertical: 15,
  },
  selectionTileBorder: { borderBottomWidth: 0.17 },
  selectionTileContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chevonWrapper: { flexDirection: "row", alignItems: "center" },
  capitalize: { textTransform: "capitalize" },
});
