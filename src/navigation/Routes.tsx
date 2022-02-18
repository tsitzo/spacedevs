import React, { useContext } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { SettingsContext } from "../context/SettingsContext";
import { AppStack } from "./AppStack";
import { CustomDarkTheme, CustomLightTheme } from "../theme";
import { useColorScheme } from "react-native-appearance";

export const Routes = () => {
  const scheme = useColorScheme();
  const { theme } = useContext(SettingsContext);

  let THEME;
  let STATUS_BAR_STYLE;

  if (theme === "automatic") {
    if (scheme === "dark") {
      THEME = CustomDarkTheme;
      STATUS_BAR_STYLE = "light-content";
    } else {
      THEME = CustomLightTheme;
      STATUS_BAR_STYLE = "dark-content";
    }
  } else if (theme === "light") {
    THEME = CustomLightTheme;
    STATUS_BAR_STYLE = "dark-content";
  } else if (theme === "dark") {
    THEME = CustomDarkTheme;
    STATUS_BAR_STYLE = "light-content";
  }

  return (
    <NavigationContainer theme={THEME}>
      <AppStack />
      {/** @ts-ignore **/}
      <StatusBar barStyle={STATUS_BAR_STYLE} />
    </NavigationContainer>
  );
};
