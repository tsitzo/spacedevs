import * as WebBrowser from "expo-web-browser";
import { Linking } from "react-native";
import { Browsers } from "../src/types/settings";

const openLink = async (url: string, browser: Browsers = "in app") => {
  try {
    if (browser === "in app") {
      await WebBrowser.openBrowserAsync(url);
    } else Linking.openURL(url);
  } catch (error) {
    console.log(error);
  }
};

export default openLink;
