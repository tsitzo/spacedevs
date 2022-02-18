import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { AppStack } from './AppStack';

import { StatusBar } from 'react-native';

export const Routes = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <AppStack />
      <StatusBar barStyle={'light-content'} />
    </NavigationContainer>
  );
};
