import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { useTheme } from "@react-navigation/native";

import Spacer from "../layout/Spacer";
import Typography from "../text/Typography";

interface IInfoLabelProps {
  label: string;
  value: string | number | null;
}

const InfoLabel: FC<IInfoLabelProps> = ({ label, value }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.infoLabel}>
      <View style={[styles.rect, { backgroundColor: colors.primary }]} />
      <View style={styles.labelValueContainer}>
        <Typography color="subtext" size={12}>
          {label}
        </Typography>

        <Spacer y={5} />
        <Typography variant="regular">
          {!value || value === "" ? "-" : value}
        </Typography>
      </View>
    </View>
  );
};

export default InfoLabel;

const styles = StyleSheet.create({
  infoLabel: {
    flexDirection: "row",
    justifyContent: "center",
  },
  labelValueContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    maxWidth: Dimensions.get("window").width / 2 - 30,
  },
  rect: { width: 5, marginRight: 10, borderRadius: 10 },
});
