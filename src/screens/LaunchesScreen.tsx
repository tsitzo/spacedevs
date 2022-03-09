import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  FC,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useTheme } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { SettingsContext } from "../context/SettingsContext";

import { LaunchDetailed } from "../types/apiResponse";
import { useFetch } from "../hooks/useFetch";
import { AppStackParams } from "../types/navigation";
import Spacer from "../components/layout/Spacer";
import SafeArea from "../components/layout/SafeArea";
import Typography from "../components/text/Typography";
import LaunchTile from "../components/ui/LaunchTile";

interface LaunchListResponse {
  count: number;
  next: string;
  previous: string;
  results: LaunchDetailed[];
}
interface ILaunchesScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AppTabs">;
}

const LaunchesScreen: FC<ILaunchesScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { launchType } = useContext(SettingsContext);
  const URI = `https://lldev.thespacedevs.com/2.2.0/launch/${launchType}/?limit=40&mode=detailed`;

  const { response, error, loading, fetchData } =
    useFetch<LaunchListResponse>(URI);

  const [search, setSearch] = useState<string>("");
  const [launches, setLaunches] = useState<LaunchDetailed[]>([]);

  useEffect(() => {
    if (response?.results) {
      setLaunches(response?.results);

      const filteredLaunches = response.results.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.launch_service_provider.name
            .toLowerCase()
            .includes(search.toLowerCase())
      );

      setLaunches(filteredLaunches);
    }
  }, [search, response?.results]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.topRowIconContainer}>
          <TouchableOpacity onPress={() => fetchData()}>
            <Ionicons name="sync" color={colors.primary} size={24} />
          </TouchableOpacity>
          <Spacer x={10} />
          <TouchableOpacity
            onPress={() => navigation.push("SavedLaunchesScreen")}
          >
            <Ionicons name="bookmark" color={colors.primary} size={24} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.push("LaunchesFilterScreen")}
        >
          <Ionicons name="menu" color={colors.primary} size={26} />
        </TouchableOpacity>
      ),
      headerSearchBarOptions: {
        onChangeText: (event) => setSearch(event.nativeEvent.text),
        textColor: colors.subtext,
        obscureBackground: false,
      },
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
      {response?.results && launches && !loading && !error && (
        <FlatList
          contentContainerStyle={styles.flatListContent}
          data={launches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.listItemWrapper,
                {
                  borderBottomColor: colors.separator,
                  borderBottomWidth:
                    index + 1 < response.results.length ? 0.17 : 0,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.push("LaunchDetailsScreen", {
                    id: item.id,
                    name: item.mission?.name
                      ? item.mission.name.split("(")[0]
                      : "Unknown",
                  })
                }
              >
                <LaunchTile launch={item} />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeArea>
  );
};

export default LaunchesScreen;

const styles = StyleSheet.create({
  topRowIconContainer: { flexDirection: "row" },
  centeredPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemWrapper: { paddingVertical: 20 },
  flatListContent: { paddingHorizontal: 15 },
});
