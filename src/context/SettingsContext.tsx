import React, { FC, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Themes } from "../types/settings";

type SettingsContextState = {
  theme: Themes;
  selectTheme: (theme: Themes) => void;
};

const contextDefaultValue: SettingsContextState = {
  theme: "automatic",
  selectTheme: () => {},
};
export const SettingsContext =
  createContext<SettingsContextState>(contextDefaultValue);

export const SettingsContextProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(contextDefaultValue.theme);

  const selectTheme = (theme: Themes) => {
    setTheme(theme);
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

  useEffect(() => {
    loadTheme();
  }, []);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  return (
    <SettingsContext.Provider value={{ theme, selectTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};
