import { useTheme } from "@react-navigation/native";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Entypo } from "@expo/vector-icons";
import Spacer from "../layout/Spacer";
import Typography from "../text/Typography";

interface IGenericNavigationTileProps {
  label: string;
  value: string;
}

const GenericNavigationTile: FC<IGenericNavigationTileProps> = ({
  label,
  value,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.navigationCard, { backgroundColor: colors.card }]}>
      <View style={[styles.navigationCardLeft]}>
        <View style={styles.navigationCardLabelRow}>
          <View style={[styles.rect, { backgroundColor: colors.primary }]} />
          <Typography color="subtext" size={12}>
            {label}
          </Typography>
        </View>
        <Spacer y={5} />
        <Typography variant="bold">{value}</Typography>
      </View>
      <View style={styles.navigationCardRight}>
        <Entypo name="chevron-right" size={20} color={colors.subtext} />
      </View>
    </View>
  );
};

export default GenericNavigationTile;

const styles = StyleSheet.create({
  navigationCard: {
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rect: { height: "100%", width: 5, marginRight: 5, borderRadius: 5 },
  navigationCardLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  navigationCardLeft: { flex: 4.5 / 5 },
  navigationCardRight: {
    flex: 0.5 / 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
