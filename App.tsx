import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import { BookmarksContextProvider } from "./src/context/BookmarksContext";
import { SettingsContextProvider } from "./src/context/SettingsContext";
import { Routes } from "./src/navigation/Routes";

const App = () => {
  return (
    <AppearanceProvider>
      <SettingsContextProvider>
        <BookmarksContextProvider>
          <Routes />
        </BookmarksContextProvider>
      </SettingsContextProvider>
    </AppearanceProvider>
  );
};

export default App;
