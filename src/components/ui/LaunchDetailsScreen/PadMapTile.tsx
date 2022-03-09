import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import openMap from "react-native-open-maps";
import MapView, { Marker } from "react-native-maps";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

import { Pad } from "../../../types/apiResponse";
import Spacer from "../../layout/Spacer";
import Typography from "../../text/Typography";

interface IPadMapTileProps {
  pad: Pad;
}

const PadMapTile: FC<IPadMapTileProps> = ({ pad }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.mapTile, { backgroundColor: colors.card }]}
      onPress={() =>
        openMap({
          latitude: parseFloat(pad.latitude),
          longitude: parseFloat(pad.longitude),
        })
      }
    >
      <View style={styles.mapWrapper}>
        <MapView
          pointerEvents="none"
          style={styles.mapView}
          initialRegion={{
            latitude: parseFloat(pad.latitude),
            longitude: parseFloat(pad.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(pad.latitude),
              longitude: parseFloat(pad.longitude),
            }}
          />
        </MapView>
      </View>
      <View style={styles.mapTileLower}>
        <View style={[styles.mapTileLeft]}>
          <View style={styles.mapTileLabelRow}>
            <View style={[styles.rect, { backgroundColor: colors.primary }]} />
            <Typography color="subtext" size={12}>
              Launchpad
            </Typography>
          </View>

          <Spacer y={5} />
          <Typography variant="bold">{pad.name}</Typography>
        </View>
        <View style={styles.mapTileRight}>
          <Entypo name="chevron-right" size={20} color={colors.subtext} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PadMapTile;

const styles = StyleSheet.create({
  mapTile: {
    flexDirection: "column",
    borderRadius: 5,
  },
  mapWrapper: {
    overflow: "hidden",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  mapView: {
    height: 200,
    width: "100%",
  },
  mapTileLower: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapTileLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rect: { height: "80%", width: 5, marginRight: 5, borderRadius: 5 },

  mapTileLeft: { flex: 4.5 / 5 },
  mapTileRight: {
    flex: 0.5 / 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
