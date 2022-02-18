import React from 'react';
import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { AppTabsParams } from '../types/navigation';
import { EventsScreen, HomeScreen, LaunchesScreen, NewsScreen, SettingsScreen } from '../screens';

const HomeStack = createNativeStackNavigator();
const NewsStack = createNativeStackNavigator();
const EventsStack = createNativeStackNavigator();
const LaunchesStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

const Tabs = createBottomTabNavigator<AppTabsParams>();

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Orbital" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const SettingsScreenStack = () => {
  const { colors } = useTheme();

  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.card },

        headerLargeTitleShadowVisible: false,
      }}
    >
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
};

const LaunchesScreenStack = () => {
  const { colors } = useTheme();

  return (
    <LaunchesStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.card },

        headerLargeTitleShadowVisible: false,
      }}
    >
      <LaunchesStack.Screen name="Launches" component={LaunchesScreen} />
    </LaunchesStack.Navigator>
  );
};

const NewsScreenStack = () => {
  const { colors } = useTheme();

  return (
    <NewsStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeStyle: { backgroundColor: colors.background },
        headerStyle: { backgroundColor: colors.card },
        headerLargeTitleShadowVisible: false,
      }}
    >
      <NewsStack.Screen name="News" component={NewsScreen} />
    </NewsStack.Navigator>
  );
};

const EventsScreenStack = () => {
  const { colors } = useTheme();

  return (
    <EventsStack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeStyle: {
          backgroundColor: colors.background,
        },
        headerStyle: { backgroundColor: colors.card },
        headerLargeTitleShadowVisible: false,
      }}
    >
      <EventsStack.Screen name="Events" component={EventsScreen} />
    </EventsStack.Navigator>
  );
};

export const AppTabs = () => {
  const { colors } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        // headerTransparent: false,
        tabBarStyle: {
          backgroundColor: colors.card,
        },
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        component={HomeScreenStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'md-home' : 'md-home-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="LaunchesScreen"
        component={LaunchesScreenStack}
        options={{
          tabBarLabel: 'Launches',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'md-flame' : 'md-flame-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="EventsScreen"
        component={EventsScreenStack}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'md-calendar' : 'md-calendar-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="NewsScreen"
        component={NewsScreenStack}
        options={{
          tabBarLabel: 'News',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'md-newspaper' : 'md-newspaper-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SettingsScreen"
        component={SettingsScreenStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'md-settings' : 'md-settings-outline'}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
