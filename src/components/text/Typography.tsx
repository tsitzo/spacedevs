import React, { FC } from "react";
import { useTheme } from "@react-navigation/native";
import { TextStyle, Text, TextProps, StyleSheet } from "react-native";

interface ITypographyProps extends TextProps {
  style?: TextStyle | TextStyle[];
  variant?: "light" | "regular" | "bold";
  color?: "primary" | "text" | "subtext";
  size?: number;
}

const Typography: FC<ITypographyProps> = ({
  children,
  variant,
  style,
  color = "text",
  size = 16,
  ...rest
}) => {
  const { colors } = useTheme();
  let textStyle;
  switch (variant) {
    case "light":
      textStyle = styles.light;
      break;
    case "regular":
      textStyle = styles.regular;
      break;
    case "bold":
      textStyle = styles.bold;
      break;
    default:
      textStyle = styles.regular;
      break;
  }

  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <Text
      style={[
        textStyle,
        { color: colors[color], fontSize: size },
        { ...passedStyles },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Typography;

const styles = StyleSheet.create({
  light: { fontWeight: "300" },
  regular: { fontWeight: "normal" },
  bold: { fontWeight: "700" },
});
