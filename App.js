// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { TabNavigator, StackNavigator } from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
//
// import DealsScreen from './src/screens/DealsScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import InternalBrowser from './src/screens/InternalBrowser';
//
//
// const DealsTab = StackNavigator(
//   {
//     Deals: {
//       screen: DealsScreen,
//       path: '/',
//       navigationOptions: () => ({
//         title: 'Latest Deals',
//       }),
//     },
//     Browser: {
//       screen : InternalBrowser,
//       path: '/deal',
//       navigationOptions: ({navigation}) => ({
//         title: navigation.state.params.title
//       }),
//     },
//   }
// );
//
// const ProfileTab = StackNavigator(
//   {
//     Profile: {
//       screen: ProfileScreen,
//       path: '/profile',
//       navigationOptions: () => ({
//         title: 'Profile',
//       }),
//     },
//   }
// );
//
//
//
//
// export default AirfareSpotApp = TabNavigator(
//   {
//     DealsTab: {
//       screen: DealsTab,
//       path: '/',
//       navigationOptions: {
//         tabBarLabel: 'Deals',
//         tabBarIcon: ({ tintColor, focused }) => (
//           <Ionicons
//             name={focused ? 'ios-list-box' : 'ios-list-box-outline'}
//             size={26}
//             style={{ color: tintColor }}
//           />
//         ),
//       },
//     },
//     ProfileTab: {
//       screen: props => ProfileScreen,
//       path: '/profile',
//       navigationOptions: {
//         tabBarLabel: 'Profile',
//         tabBarIcon: ({ tintColor, focused }) => (
//           <Ionicons
//             name={focused ? 'ios-settings' : 'ios-settings-outline'}
//             size={26}
//             style={{ color: tintColor }}
//           />
//         ),
//       },
//     },
//   },
//   {
//     tabBarPosition: 'bottom',
//     lazy: true,
//     tabBarOptions: {
//       activeTintColor: '#e91e63',
//     },
//   }
// );
//
// const styles = StyleSheet.create({
//   container: {
//   },
// });
//
// const AppContainer = props => <App screenProps={{ ...props }} />;
//
//
//
//
//
//
//
//
//
//
//
//
global.Buffer = global.Buffer || require('buffer').Buffer; // Required for aws sigv4 signing


import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import { WithAuth } from './lib/Categories/Auth/Components';

import First from './src/screens/First';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import SignOut from './src/components/SignOut';
import ForgotPassword from './src/components/ForgotPassword';

const App = DrawerNavigator({
  Home: {
    screen: props => <Home rootNavigator={props.navigation} {...props.screenProps } />,
  },
  ForgotPassword: {
    screen: (props) => {
      return <ForgotPassword {...props.screenProps} onCancel={() => props.navigation.navigate('Home')} onSuccess={() => props.navigation.navigate('Home')} />
    }, navigationOptions: { drawerLabel: 'Change password' }
  },
  SignOut: {
    screen: (props) => {
      return <SignOut rootNavigator={props.navigation} {...props} />
    }, navigationOptions: { drawerLabel: 'Sign Out' }
  },
  Splash: {
    screen: props => <Splash navigation={props.navigation} { ...props.screenProps } />,
    navigationOptions: {
      drawerLabel: ' ',
    },
  },
  FirstScreen: {
    screen: props => <First rootNavigator={props.navigation} screenProps={{ ...props.screenProps }} />,
    navigationOptions: {
      drawerLabel: ' ',
    },
  },
}, { initialRouteName: 'Splash' });

const AppContainer = props => <App screenProps={{ ...props }} />;

export default WithAuth(AppContainer);

