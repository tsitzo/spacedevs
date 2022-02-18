import React from 'react';
import { useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppStackParams } from '../types/navigation';
import { AppTabs } from './AppTabs';
import {
  LaunchDetailsScreen,
  SettingsThemeScreen,
  SettingsLaunchesScreen,
  SettingsBrowserScreen,
  SettingsNewsScreen,
  SavedLaunchesScreen,
  LaunchesFilterScreen,
  NewsFilterScreen,
  SavedNewsScreen,
  SavedEventsScreen,
  AgencyDetailsScreen,
  AgencyLaunchesScreen,
  RocketDetailsScreen,
  RocketLaunchesScreen,
} from '../screens';

const Stack = createNativeStackNavigator<AppStackParams>();

export const AppStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen name="AppTabs" component={AppTabs} options={{ headerShown: false }} />
      <Stack.Screen name="LaunchDetailsScreen" component={LaunchDetailsScreen} />
      <Stack.Screen name="AgencyDetailsScreen" component={AgencyDetailsScreen} />
      <Stack.Screen name="AgencyLaunchesScreen" component={AgencyLaunchesScreen} />
      <Stack.Screen name="RocketDetailsScreen" component={RocketDetailsScreen} />
      <Stack.Screen name="RocketLaunchesScreen" component={RocketLaunchesScreen} />

      <Stack.Screen
        name="SettingsThemeScreen"
        component={SettingsThemeScreen}
        options={{ headerTitle: 'Theme' }}
      />
      <Stack.Screen
        name="SettingsLaunchesScreen"
        component={SettingsLaunchesScreen}
        options={{ headerTitle: 'Launches' }}
      />
      <Stack.Screen
        name="SettingsBrowserScreen"
        component={SettingsBrowserScreen}
        options={{ headerTitle: 'Browser' }}
      />
      <Stack.Screen
        name="SettingsNewsScreen"
        component={SettingsNewsScreen}
        options={{ headerTitle: 'News' }}
      />
      <Stack.Screen
        name="SavedNewsScreen"
        component={SavedNewsScreen}
        options={{ headerTitle: 'Saved News' }}
      />
      <Stack.Screen
        name="SavedEventsScreen"
        component={SavedEventsScreen}
        options={{ headerTitle: 'Saved Events' }}
      />
      <Stack.Screen
        name="SavedLaunchesScreen"
        component={SavedLaunchesScreen}
        options={{ headerTitle: 'Saved Launches' }}
      />
      <Stack.Screen
        name="NewsFilterScreen"
        component={NewsFilterScreen}
        options={{
          headerTitle: 'Select News Site',
        }}
      />
      <Stack.Screen
        name="LaunchesFilterScreen"
        component={LaunchesFilterScreen}
        options={{
          headerTitle: 'Select Launches',
        }}
      />
    </Stack.Navigator>
  );
};
