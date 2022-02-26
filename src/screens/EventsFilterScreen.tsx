import React, { FC, useContext, useLayoutEffect } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { SettingsContext } from "../context/SettingsContext";
import { AppStackParams } from "../types/navigation";
import Typography from "../components/text/Typography";
import SafeArea from "../components/layout/SafeArea";
import { EventType } from "../types/settings";

interface IEventsFilterScreenProps {
  navigation: NativeStackNavigationProp<AppStackParams, "EventsFilterScreen">;
}

const EventsFilterScreen: FC<IEventsFilterScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { eventType, selectEventType } = useContext(SettingsContext);

  const eventTypes: EventType[] = ["upcoming", "previous"];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close-circle" color={colors.primary} size={22} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <SafeArea>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View
          style={[styles.optionContainer, { backgroundColor: colors.card }]}
        >
          {eventTypes.map((item, index) => (
            <View
              key={index}
              style={[
                styles.selectionTile,
                {
                  borderBottomColor: colors.separator,
                  borderBottomWidth: index + 1 < eventTypes.length ? 0.17 : 0,
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  selectEventType(item);
                  navigation.goBack();
                }}
                style={styles.selectionTileContent}
              >
                <Typography variant={eventType === item ? "bold" : "regular"}>
                  {item}
                </Typography>
                {eventType === item && (
                  <Ionicons name="checkmark" color={colors.primary} size={18} />
                )}
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default EventsFilterScreen;

const styles = StyleSheet.create({
  optionContainer: { margin: 15, paddingHorizontal: 15, borderRadius: 10 },
  textWrapper: { marginHorizontal: 15, marginTop: 10 },

  selectionTile: {
    paddingVertical: 15,
  },
  selectionTileContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
