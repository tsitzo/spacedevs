import React, { FC, useContext } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { RouteProp, useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { AppStackParams } from "../types/navigation";
import { useFetch } from "../hooks/useFetch";
import { LaunchDetailed, NewsArticle } from "../types/apiResponse";
import { SettingsContext } from "../context/SettingsContext";
import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";
import Typography from "../components/text/Typography";
import InfoLabel from "../components/ui/InfoLabel";
import moment from "moment-timezone";
import GenericNavigationTile from "../components/ui/GenericNavigationTile";
import { PadMapTile } from "../components/ui/LaunchDetailsScreen";

interface ILaunchDetailsScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "LaunchDetailsScreen">;
  route: RouteProp<AppStackParams, "LaunchDetailsScreen">;
}

const LaunchDetailsScreen: FC<ILaunchDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { colors } = useTheme();
  const { id } = route.params;
  const { timezone } = useContext(SettingsContext);

  const LAUNCH_URI = `https://lldev.thespacedevs.com/2.2.0/launch/${id}/?mode=detailed`;
  const NEWS_URI = `https://api.spaceflightnewsapi.net/v3/articles/launch/${id}`;

  const {
    response: launchResponse,
    loading,
    error,
    fetchData,
  } = useFetch<LaunchDetailed>(LAUNCH_URI);
  const { response: newsResponse, fetchData: fetchNews } =
    useFetch<NewsArticle[]>(NEWS_URI);
  return (
    <SafeArea>
      {loading && (
        <View style={styles.centeredPage}>
          <ActivityIndicator size={60} color={colors.primary} />
        </View>
      )}
      {error && !loading && (
        <View style={styles.centeredPage}>
          <TouchableOpacity
            onPress={() => {
              fetchData();
              fetchNews();
            }}
          >
            <Ionicons name="refresh" color={colors.primary} size={40} />
          </TouchableOpacity>
          <Spacer y={10} />

          <Typography>There was an error fetching data.</Typography>
        </View>
      )}
      {launchResponse && newsResponse && !loading && !error && (
        <ScrollView
          style={styles.scrollviewWrapper}
          contentContainerStyle={styles.scrollviewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.row, styles.missionPatchContainer]}>
            <View style={styles.missionPatchContainerLeft}>
              <InfoLabel
                label="Date"
                value={moment
                  .utc(launchResponse.net)
                  .tz(timezone)
                  .format("LLL")}
              />
              <Spacer y={10} />
              <InfoLabel
                label="Mission Type"
                value={
                  launchResponse.mission?.type
                    ? launchResponse.mission.type
                    : "Unknown"
                }
              />
              <Spacer y={10} />
              <InfoLabel
                label="Location"
                value={launchResponse.pad.location.name}
              />
            </View>
            <View style={styles.missionPatchContainerRight}>
              {launchResponse.mission_patches.length > 0 ? (
                <Image
                  source={{ uri: launchResponse.mission_patches[0].image_url }}
                  style={styles.missionPatch}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../../assets/logo.png")}
                  style={styles.missionPatch}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>

          <Spacer y={20} />

          <Typography color="subtext" size={12}>
            Details
          </Typography>

          <Spacer y={10} />

          <Typography>
            {launchResponse.mission?.description
              ? launchResponse.mission.description
              : "No details available at the moment."}
          </Typography>

          <Spacer y={10} />

          <Typography color="subtext" size={12}>
            Updates
          </Typography>

          <Spacer y={10} />

          <Typography>{launchResponse.status.description}</Typography>

          <Spacer y={20} />

          <TouchableOpacity onPress={() => {}}>
            <GenericNavigationTile
              label="Agency"
              value={
                launchResponse.launch_service_provider.name.length > 30
                  ? launchResponse.launch_service_provider.abbrev
                  : launchResponse.launch_service_provider.name
              }
            />
          </TouchableOpacity>

          <Spacer y={20} />

          <PadMapTile pad={launchResponse.pad} />

          <Spacer y={20} />

          <TouchableOpacity onPress={() => {}}>
            <GenericNavigationTile
              label="Rocket"
              value={launchResponse.rocket.configuration.full_name}
            />
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeArea>
  );
};

export default LaunchDetailsScreen;

const styles = StyleSheet.create({
  centeredPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollviewWrapper: {
    padding: 15,
  },
  scrollviewContent: { paddingBottom: 30 },
  row: {
    flexDirection: "row",
  },
  missionPatchContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  missionPatchContainerLeft: {
    flex: 3 / 5,
    alignItems: "flex-start",
  },
  missionPatchContainerRight: {
    flexDirection: "row",
    flex: 1.5 / 5,
    alignItems: "flex-end",
  },
  missionPatch: {
    width: "100%",
    aspectRatio: 1,
  },
});
