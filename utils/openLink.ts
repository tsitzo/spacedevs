import { Browsers } from "../context/SettingsContext";
import * as WebBrowser from "expo-web-browser";
import { Linking } from "react-native";

const openLink = async (url: string, browser: Browsers = Browsers.inApp) => {
  try {
    if (browser === Browsers.inApp) {
      await WebBrowser.openBrowserAsync(url);
    } else Linking.openURL(url);
  } catch (error) {
    console.log(error);
  }
};

export default openLink;
