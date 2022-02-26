import React, { FC, useContext, useLayoutEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SpaceEvent } from "../types/apiResponse";
import { AppStackParams } from "../types/navigation";
import { useTheme } from "@react-navigation/native";
import { useFetch } from "../hooks/useFetch";
import SafeArea from "../components/layout/SafeArea";
import Spacer from "../components/layout/Spacer";
import Typography from "../components/text/Typography";
import EventTile from "../components/ui/EventTile";
import { SettingsContext } from "../context/SettingsContext";

interface SpaceEventResponse {
  count: number;
  results: SpaceEvent[];
}
interface IEventsScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "AppTabs">;
}

const EventsScreen: FC<IEventsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { eventType } = useContext(SettingsContext);
  const URI = `https://lldev.thespacedevs.com/2.2.0/event/${eventType}/?limit=30`;
  const { response, error, loading, fetchData } =
    useFetch<SpaceEventResponse>(URI);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.push("EventsFilterScreen")}>
          <Ionicons name="menu" color={colors.primary} size={26} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={() => fetchData()}>
          <Ionicons name="sync" color={colors.primary} size={24} />
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
          data={response.results}
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
              <EventTile event={item} />
            </View>
          )}
        />
      )}
    </SafeArea>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  centeredPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemWrapper: { paddingVertical: 20 },
  flatListContent: { paddingHorizontal: 15 },
});
