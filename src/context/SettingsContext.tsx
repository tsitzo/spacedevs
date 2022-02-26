import React, { FC, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Browsers,
  LaunchType,
  Themes,
  NewsSite,
  EventType,
} from "../types/settings";

type SettingsContextState = {
  theme: Themes;
  launchType: LaunchType;
  eventType: EventType;
  browser: Browsers;
  newsSite: NewsSite;
  selectTheme: (theme: Themes) => void;
  selectLaunchType: (launchType: LaunchType) => void;
  selectEventType: (eventType: EventType) => void;
  selectBrowser: (browser: Browsers) => void;
  selectNewsSite: (newsSite: NewsSite) => void;
};

const contextDefaultValue: SettingsContextState = {
  theme: "automatic",
  launchType: "upcoming",
  eventType: "upcoming",
  browser: "in app",
  newsSite: "",
  selectTheme: () => {},
  selectLaunchType: () => {},
  selectEventType: () => {},
  selectBrowser: () => {},
  selectNewsSite: () => {},
};
export const SettingsContext =
  createContext<SettingsContextState>(contextDefaultValue);

export const SettingsContextProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Themes>(contextDefaultValue.theme);
  const [launchType, setLaunchType] = useState<LaunchType>(
    contextDefaultValue.launchType
  );
  const [eventType, setEventType] = useState<EventType>(
    contextDefaultValue.eventType
  );

  const [newsSite, setNewsSite] = useState<NewsSite>(
    contextDefaultValue.newsSite
  );
  const [browser, setBrowser] = useState<Browsers>(contextDefaultValue.browser);

  const selectTheme = (theme: Themes) => {
    setTheme(theme);
  };

  const selectLaunchType = (launchType: LaunchType) =>
    setLaunchType(launchType);

  const selectEventType = (eventType: EventType) => setEventType(eventType);

  const selectBrowser = (browser: Browsers) => {
    setBrowser(browser);
  };

  const selectNewsSite = (newsSite: NewsSite) => {
    setNewsSite(newsSite);
  };

  const saveTheme = async (value: Themes) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@ORBITALSettings/theme", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("@ORBITALSettings/theme");
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
      await AsyncStorage.setItem("@ORBITALSettings/launchType", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadLaunchType = async () => {
    try {
      const value = await AsyncStorage.getItem("@ORBITALSettings/launchType");
      if (value !== null) {
        setLaunchType(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveEventType = async (value: EventType) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@ORBITALSettings/eventType", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadEventType = async () => {
    try {
      const value = await AsyncStorage.getItem("@ORBITALSettings/eventType");
      if (value !== null) {
        setEventType(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveBrowser = async (value: Browsers) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@ORBITALSettings/browser", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadBrowser = async () => {
    try {
      const value = await AsyncStorage.getItem("@ORBITALSettings/browser");
      if (value !== null) {
        setBrowser(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveNewsSite = async (value: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@ORBITALSettings/newsSite", jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadNewsSite = async () => {
    try {
      const value = await AsyncStorage.getItem("@ORBITALSettings/newsSite");
      if (value !== null) {
        setNewsSite(JSON.parse(value));
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
    loadEventType();
  }, []);

  useEffect(() => {
    loadBrowser();
  }, []);

  useEffect(() => {
    loadNewsSite();
  }, []);

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  useEffect(() => {
    saveLaunchType(launchType);
  }, [launchType]);

  useEffect(() => {
    saveEventType(eventType);
  }, [eventType]);

  useEffect(() => {
    saveBrowser(browser);
  }, [browser]);

  useEffect(() => {
    saveNewsSite(newsSite);
  }, [newsSite]);

  return (
    <SettingsContext.Provider
      value={{
        theme,
        launchType,
        browser,
        newsSite,
        eventType,
        selectTheme,
        selectLaunchType,
        selectEventType,
        selectBrowser,
        selectNewsSite,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
