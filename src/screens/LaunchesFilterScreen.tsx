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
import { LaunchType } from "../types/settings";

interface ILaunchesFilterScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "LaunchesFilterScreen">;
}

const LaunchesFilterScreen: FC<ILaunchesFilterScreenProps> = ({
  navigation,
}) => {
  const { colors } = useTheme();
  const { launchType, selectLaunchType } = useContext(SettingsContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-circle" color={colors.primary} size={22} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const launchTypes: LaunchType[] = ["previous", "upcoming"];

  return (
    <SafeArea>
      <StatusBar barStyle="light-content" />
      <ScrollView>
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
                onPress={() => {
                  selectLaunchType(item);
                  navigation.goBack();
                }}
                style={styles.selectionTileContent}
              >
                <Typography
                  variant={launchType === item ? "bold" : "regular"}
                  style={styles.text}
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

export default LaunchesFilterScreen;

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
  text: { textTransform: "capitalize" },
});
