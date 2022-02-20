import React, { FC, useContext, useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import moment from "moment";

import { NewsArticle } from "../../../types/apiResponse";
import { SettingsContext } from "../../../context/SettingsContext";
import Spacer from "../../layout/Spacer";
import Typography from "../../text/Typography";
import openLink from "../../../../utils/openLink";

interface INewsTileProps {
  article: NewsArticle;
}

const NewsTile: FC<INewsTileProps> = ({ article }) => {
  const { browser } = useContext(SettingsContext);
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <TouchableOpacity onPress={() => openLink(article.url, browser)}>
      {isLoading && (
        <View
          style={[styles.placeHolderImage, { backgroundColor: colors.card }]}
        >
          <ActivityIndicator color={colors.primary} />
        </View>
      )}
      {article.imageUrl !== "" ? (
        <Image
          resizeMode="cover"
          source={{
            uri: article.imageUrl,
          }}
          style={styles.image}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
        />
      ) : (
        <View
          style={[styles.placeHolderImage, { backgroundColor: colors.card }]}
        >
          <ActivityIndicator color={colors.primary} />
        </View>
      )}
      <Spacer y={20} />

      <View style={styles.row}>
        <View style={{ flex: 4.7 / 5 }}>
          <Typography variant="bold">{article.title}</Typography>
        </View>
      </View>

      <Spacer y={10} />

      <Typography color="subtext" size={14}>
        {article.summary}
      </Typography>

      <Spacer y={10} />

      <View style={styles.row}>
        <Typography color="subtext" size={14}>
          {moment(article.publishedAt).format("LLL")}
        </Typography>
        <Typography variant="bold" color="primary" size={14}>
          {article.newsSite}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

export default NewsTile;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeHolderImage: {
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    zIndex: 0,
    width: "100%",
    position: "absolute",
    aspectRatio: 1.7 / 1,
    borderRadius: 10,
  },
  image: { width: "100%", aspectRatio: 1.7 / 1, zIndex: 0, borderRadius: 10 },
});
