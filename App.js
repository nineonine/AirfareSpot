import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import DealsScreen from './screens/DealsScreen';
import ProfileScreen from './screens/ProfileScreen';

export default AirfareSpotApp = TabNavigator(
  {
    Deals: {
      screen: DealsScreen,
      path: '',
    },
    Profile: {
      screen: ProfileScreen,
      path: 'profile'
    },
  },
  {
    tabBarPosition: 'bottom',
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

const styles = StyleSheet.create({
  container: {
  },
});
