import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DealsScreen from './screens/DealsScreen';
import ProfileScreen from './screens/ProfileScreen';
import InternalBrowser from './screens/InternalBrowser';


const DealsTab = StackNavigator(
  {
    Deals: {
      screen: DealsScreen,
      path: '/',
      navigationOptions: () => ({
        title: 'Latest Deals',
      }),
    },
    Browser: {
      screen : InternalBrowser,
      path: '/deal',
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title
      }),
    },
  }
);

const ProfileTab = StackNavigator(
  {
    Deals: {
      screen: ProfileScreen,
      path: '/profile',
      navigationOptions: () => ({
        title: 'Profile',
      }),
    },
  }
);




export default AirfareSpotApp = TabNavigator(
  {
    DealsTab: {
      screen: DealsTab,
      path: '/',
      navigationOptions: {
        tabBarLabel: 'Deals',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    ProfileTab: {
      screen: ProfileTab,
      path: '/profile',
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },

    // Profile: {
    //   screen: ProfileScreen,
    //   path: '/profile',
    // },
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
