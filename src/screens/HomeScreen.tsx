import React from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import { useTheme } from "@react-navigation/native";

import { LaunchDetailed } from "../types/apiResponse";
import useFetch from "../hooks/useFetch";

import Typography from "../components/text/Typography";
import Spacer from "../components/layout/Spacer";

interface LaunchListResponse {
  count: number;
  next: string;
  previous: string;
  results: LaunchDetailed[];
}

const HomeScreen = () => {
  const URI = `https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=1&mode=detailed`;
  const { colors } = useTheme();

  const { data, error } = useFetch<LaunchListResponse>(URI);

  const launch = data?.results[0];

  return (
    <View style={styles.page}>
      {!data && (
        <View style={styles.centeredPage}>
          <ActivityIndicator size={60} color={colors.primary} />
        </View>
      )}
      {error && (
        <View style={styles.centeredPage}>
          <Typography>There was an error fetching data.</Typography>
        </View>
      )}
      {launch && (
        <ImageBackground
          source={{
            uri: launch?.image
              ? launch.image
              : "https://parispeaceforum.org/wp-content/uploads/2021/10/NET-ZERO-SPACE-INITIATIVE-1.png",
          }}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.imageBackgroundContent}>
            <Typography variant="bold" size={30} style={styles.launchNameText}>
              {launch.mission?.name.split("(")[0]}
            </Typography>
            <Typography variant="bold" size={30} style={styles.launchNameText}>
              ({launch.mission?.name.split("(")[1]}
            </Typography>
            <Spacer y={10} />
            <Typography style={styles.launchNameSubtext}>
              {launch.launch_service_provider.name}
            </Typography>
            <Spacer y={10} />
            <View style={{ padding: 20, backgroundColor: colors.card }}>
              <Typography>COUNTDOWN</Typography>
            </View>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  page: { flex: 1 },
  centeredPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackgroundContainer: { flex: 1, backgroundColor: "black" },
  imageBackground: { opacity: 0.4 },
  imageBackgroundContent: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
  },
  launchNameText: { color: "#fff" },
  launchNameSubtext: { color: "#989899" },
});
