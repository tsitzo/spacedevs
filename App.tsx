import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import { SettingsContextProvider } from "./src/context/SettingsContext";
import { Routes } from "./src/navigation/Routes";

const App = () => {
  return (
    <AppearanceProvider>
      <SettingsContextProvider>
        <Routes />
      </SettingsContextProvider>
    </AppearanceProvider>
  );
};

export default App;
