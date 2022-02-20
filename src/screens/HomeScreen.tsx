import React, { FC } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { LaunchDetailed } from "../types/apiResponse";
import { useFetch } from "../hooks/useFetch";
import { AppStackParams } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Typography from "../components/text/Typography";
import Spacer from "../components/layout/Spacer";
import HomeCountdown from "../components/ui/HomeCountdown";
import SafeArea from "../components/layout/SafeArea";

interface LaunchListResponse {
  count: number;
  next: string;
  previous: string;
  results: LaunchDetailed[];
}

interface IHomeScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AppTabs">;
}

const HomeScreen: FC<IHomeScreenProps> = ({ navigation }) => {
  const URI = `https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=3&mode=detailed`;
  const { colors } = useTheme();

  const { response, loading, error, fetchData } =
    useFetch<LaunchListResponse>(URI);

  const launch = response?.results.filter(
    (launch) => moment(launch.net).valueOf() / 1000 > moment().unix()
  )[0];

  return (
    <View style={styles.page}>
      {loading && (
        <View style={styles.centeredPage}>
          <ActivityIndicator size={60} color={colors.primary} />
        </View>
      )}
      {error && (
        <View style={styles.centeredPage}>
          <TouchableOpacity onPress={() => fetchData()}>
            <Ionicons name="refresh" color={colors.primary} size={40} />
          </TouchableOpacity>
          <Spacer y={10} />
          <Typography>There was an error fetching data.</Typography>
        </View>
      )}
      {!loading && !error && launch && (
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
          <SafeArea>
            <TouchableOpacity
              style={styles.imageBackgroundContent}
              onPress={() =>
                navigation.push("LaunchDetailsScreen", {
                  id: launch.id,
                  name: launch.mission?.name.split("(")[0]!,
                })
              }
            >
              <Typography
                variant="bold"
                size={32}
                style={styles.launchNameText}
              >
                {launch.mission?.name.split("(")[0]}
              </Typography>

              <Typography style={styles.launchNameSubtext}>
                {launch.launch_service_provider.name}
              </Typography>
              <Spacer y={20} />
              <View style={styles.countdownWrapper}>
                <HomeCountdown date={launch.net} />
              </View>
            </TouchableOpacity>
          </SafeArea>
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
  touchable: { flex: 1 },
  launchNameText: { color: "#fff" },
  launchNameSubtext: { color: "#989899" },
  countdownWrapper: { flexDirection: "row", justifyContent: "flex-start" },
});
