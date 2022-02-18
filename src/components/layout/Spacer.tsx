import React, { FC } from "react";
import { View } from "react-native";

interface ISpacerProps {
  x?: number;
  y?: number;
}

const Spacer: FC<ISpacerProps> = ({ x = 0, y = 0 }) => {
  return <View style={{ height: y, width: x }} />;
};

export default Spacer;
