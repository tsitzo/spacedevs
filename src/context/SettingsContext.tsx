import React, { FC, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LaunchType, Themes } from "../types/settings";

type SettingsContextState = {
  theme: Themes;
  launchType: LaunchType;
  selectTheme: (theme: Themes) => void;
  selectLaunchType: (launchType: LaunchType) => void;
};

const contextDefaultValue: SettingsContextState = {
  theme: "automatic",
  launchType: "upcoming",
  selectTheme: () => {},
  selectLaunchType: () => {},
};
export const SettingsContext =
  createContext<SettingsContextState>(contextDefaultValue);

export const SettingsContextProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(contextDefaultValue.theme);
  const [launchType, setLaunchType] = useState<LaunchType>(
    contextDefaultValue.launchType
  );

  const selectTheme = (theme: Themes) => {
    setTheme(theme);
  };

  const selectLaunchType = (launchType: LaunchType) =>
    setLaunchType(launchType);

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

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    loadLaunchType();
  }, []);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    saveLaunchType(launchType);
  }, [launchType]);

  return (
    <SettingsContext.Provider
      value={{ theme, launchType, selectTheme, selectLaunchType }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
