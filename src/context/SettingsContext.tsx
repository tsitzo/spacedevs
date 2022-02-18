import React, { FC, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Browsers, LaunchType, Themes } from "../types/settings";

type SettingsContextState = {
  theme: Themes;
  launchType: LaunchType;
  browser: Browsers;
  selectTheme: (theme: Themes) => void;
  selectLaunchType: (launchType: LaunchType) => void;
  selectBrowser: (browser: Browsers) => void;
};

const contextDefaultValue: SettingsContextState = {
  theme: "automatic",
  launchType: "upcoming",
  browser: "inApp",
  selectTheme: () => {},
  selectLaunchType: () => {},
  selectBrowser: () => {},
};
export const SettingsContext =
  createContext<SettingsContextState>(contextDefaultValue);

export const SettingsContextProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(contextDefaultValue.theme);
  const [launchType, setLaunchType] = useState<LaunchType>(
    contextDefaultValue.launchType
  );

  const [browser, setBrowser] = useState<Browsers>(contextDefaultValue.browser);

  const selectTheme = (theme: Themes) => {
    setTheme(theme);
  };

  const selectLaunchType = (launchType: LaunchType) =>
    setLaunchType(launchType);

  const selectBrowser = (browser: Browsers) => {
    setBrowser(browser);
  };

  const saveTheme = async (value: Themes) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@ORBITALV1/theme", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("@ORBITALV1/theme");
      if (value !== null) {
        setTheme(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveLaunchType = async (value: LaunchType) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@ORBITAL/launchType", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadLaunchType = async () => {
    try {
      const value = await AsyncStorage.getItem("@ORBITAL/launchType");
      if (value !== null) {
        setLaunchType(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveBrowser = async (value: Browsers) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@ORBITAL/browser", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadBrowser = async () => {
    try {
      const value = await AsyncStorage.getItem("@ORBITAL/browser");
      if (value !== null) {
        setBrowser(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    loadLaunchType();
  }, []);

  useEffect(() => {
    loadBrowser();
  }, []);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    saveLaunchType(launchType);
  }, [launchType]);

  useEffect(() => {
    saveBrowser(browser);
  }, [browser]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        launchType,
        browser,
        selectTheme,
        selectLaunchType,
        selectBrowser,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
