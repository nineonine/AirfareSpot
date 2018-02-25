import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { NavigationActions, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Home from '../components/Home';
import MyDeals from '../components/MyDeals';
import Settings from '../components/Settings';

const styles = StyleSheet.create({
  tabBarLabel: { marginLeft: 9 },
  tabBarIconContainer: { flexDirection: 'row', alignItems: 'center', height: 30 },
});

const MainScreen = TabNavigator({
  Home: {
    screen: (props) => {
      const { screenProps, navigation, ...otherProps } = props;


      return (
        <Home
          { ...screenProps }
          { ...otherProps }
        />
      );
    },
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabBarIconContainer}>
          <Ionicon type='font-awesome' name="ios-home-outline" style={styles.tabBarIcon} color={tintColor} size={30}/>
          {Platform.OS === 'ios' && <Text style={[styles.tabBarLabel, { color: tintColor }]}>Home</Text>}
        </View>
      ),
    },
  },
  MyDeals: {
    screen: (props) => {
      const { screenProps, navigation, ...otherProps } = props;
      return (
        <MyDeals
          { ...screenProps }
          { ...otherProps }
        />
      )
    },
    navigationOptions: {
      tabBarLabel: 'My Deals',
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabBarIconContainer}>
          <Ionicon type='font-awesome' name="ios-clipboard-outline" style={styles.tabBarIcon} color={tintColor} size={30} />
          {Platform.OS === 'ios' && <Text style={[styles.tabBarLabel, { color: tintColor }]}>My Deals</Text>}
        </View>
      )
    },
  },
  Settings: {
    screen: (props) => {
      const { screenProps, ...otherProps } = props;

      return (
        <Settings
          { ...screenProps }
          { ...otherProps }
          rootNav={props.rootNavigator}
        />
      )
    },
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <View style={styles.tabBarIconContainer}>
          <Ionicon type='font-awesome' name="ios-cog" style={styles.tabBarIcon} color={tintColor} size={30}/>
          {Platform.OS === 'ios' && <Text style={[styles.tabBarLabel, { color: tintColor }]}>Settings</Text>}
        </View>
      )
    },
  },
},
{
  tabBarPosition: 'bottom',
  tabBarOptions: {
    tabStyle: { borderTopWidth: 0.5, borderTopColor: '#ededed' },
    showIcon: true,
    showLabel: Platform.OS !== 'ios',
    activeTintColor: '#EE5E69',
  },
});

export default (props) => {
  const { screenProps, ...otherProps } = props;
  return <MainScreen screenProps={{ ...screenProps, ...otherProps }}/>
};
