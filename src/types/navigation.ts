export type AppTabsParams = {
  HomeScreen: undefined;
  NewsScreen: undefined;
  EventsScreen: undefined;
  LaunchesScreen: undefined;
  SettingsScreen: undefined;
};

export type AppStackParams = {
  AppTabs: undefined;
  LaunchDetailsScreen: { id: string; name: string };
  AgencyDetailsScreen: undefined;
  AgencyLaunchesScreen: undefined;
  RocketDetailsScreen: undefined;
  RocketLaunchesScreen: undefined;
  SettingsThemeScreen: undefined;
  SettingsLaunchesScreen: undefined;
  SettingsBrowserScreen: undefined;
  SettingsNewsScreen: undefined;
  SavedLaunchesScreen: undefined;
  SavedNewsScreen: undefined;
  NewsFilterScreen: undefined;
  LaunchesFilterScreen: undefined;
};
