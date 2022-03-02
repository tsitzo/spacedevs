import { StyleSheet, Image, View } from "react-native";
import React, { FC } from "react";
import { LaunchDetailed } from "../../types/apiResponse";
import Typography from "../text/Typography";
import moment from "moment-timezone";
import Spacer from "../layout/Spacer";
import { useTheme } from "@react-navigation/native";

interface ILaunchTileProps {
  launch: LaunchDetailed;
}

const LaunchTile: FC<ILaunchTileProps> = ({ launch }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.launchTile}>
      <View style={styles.launchTileLeft}>
        <Typography variant="bold" size={18}>
          {launch.mission?.name ? launch.mission.name.split("(")[0] : "Unknown"}
        </Typography>
        <Spacer y={5} />
        <Typography color="subtext" size={14}>
          {moment(launch.net).format("LLL")}
        </Typography>
        <Spacer y={5} />
        <View style={styles.chipsRow}>
          {launch.mission?.orbit && (
            <View style={[styles.chip, { backgroundColor: colors.card }]}>
              <View
                style={[styles.circle, { backgroundColor: colors.primary }]}
              />
              <Typography size={14} variant="bold" color="subtext">
                {launch.mission.orbit?.abbrev}
              </Typography>
            </View>
          )}

          <View style={[styles.chip, { backgroundColor: colors.card }]}>
            <View
              style={[styles.circle, { backgroundColor: colors.primary }]}
            />
            <Typography size={14} variant="bold" color="subtext">
              {launch.launch_service_provider.name.length > 15
                ? launch.launch_service_provider.abbrev
                : launch.launch_service_provider.name}
            </Typography>
          </View>
        </View>
      </View>
      <View style={styles.launchTileRight}>
        {launch.mission_patches[0] ? (
          <Image
            resizeMode="contain"
            source={{
              uri: launch.mission_patches[0]
                ? launch.mission_patches[0].image_url
                : "",
            }}
            style={styles.patch}
          />
        ) : (
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.patch}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
};

export default LaunchTile;

const styles = StyleSheet.create({
  launchTile: { flexDirection: "row", flex: 1, alignItems: "center" },
  patch: { width: 60, height: 60 },
  launchTileLeft: {
    flex: 3.5 / 5,
  },
  launchTileRight: {
    flex: 1.5 / 5,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  chipsRow: { flexDirection: "row" },
  chip: {
    padding: 3,
    marginRight: 10,
    borderRadius: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  circle: { borderRadius: 55, width: 10, height: 10, marginRight: 5 },
});
