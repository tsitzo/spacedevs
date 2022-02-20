import React, { FC, useContext, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { AppStackParams } from "../types/navigation";
import { useFetch } from "../hooks/useFetch";
import { useTheme } from "@react-navigation/native";
import { SettingsContext } from "../context/SettingsContext";
import { NewsArticle } from "../types/apiResponse";

import Typography from "../components/text/Typography";
import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";
import NewsTile from "../components/ui/NewsTile";

interface INewsScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AppTabs">;
}

const NewsScreen: FC<INewsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { newsSite } = useContext(SettingsContext);
  const URI = `https://api.spaceflightnewsapi.net/v3/articles?_limit=30&url_contains=${newsSite}`;
  const { response, error, loading, fetchData } = useFetch<NewsArticle[]>(URI);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.push("SavedNewsScreen")}>
          <Ionicons name="bookmark" color={colors.primary} size={24} />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.push("NewsFilterScreen")}>
          <Ionicons name="menu" color={colors.primary} size={26} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeArea>
      {loading && (
        <View style={styles.centeredPage}>
          <ActivityIndicator size={60} color={colors.primary} />
        </View>
      )}
      {error && !loading && (
        <View style={styles.centeredPage}>
          <TouchableOpacity onPress={() => fetchData()}>
            <Ionicons name="refresh" color={colors.primary} size={40} />
          </TouchableOpacity>
          <Spacer y={10} />
          <Typography>There was an error fetching data.</Typography>
        </View>
      )}
      {response && !loading && !error && (
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={response}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.listItemWrapper,
                {
                  borderBottomColor: colors.separator,
                  borderBottomWidth: index + 1 < response.length ? 0.17 : 0,
                },
              ]}
            >
              <NewsTile article={item} />
            </View>
          )}
        />
      )}
    </SafeArea>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  centeredPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemWrapper: { paddingVertical: 20 },
  flatListContent: { paddingHorizontal: 15 },
});
