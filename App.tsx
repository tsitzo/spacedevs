import React from "react";
import { AppearanceProvider } from "react-native-appearance";
import { Routes } from "./src/navigation/Routes";

const App = () => {
  return (
    <AppearanceProvider>
      <Routes />
    </AppearanceProvider>
  );
};

export default App;
