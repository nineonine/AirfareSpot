global.Buffer = global.Buffer || require('buffer').Buffer; // Required for aws sigv4 signing

import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import { WithAuth } from './lib/Categories/Auth/Components';

import First from './src/screens/First';
import Splash from './src/screens/Splash';
import Main from './src/screens/Main';
import SignOut from './src/components/SignOut';
import ForgotPassword from './src/components/ForgotPassword';

const App = DrawerNavigator({
  Main: {
    screen: props => <Main rootNavigator={props.navigation} {...props.screenProps } check={"check here"} />,
  },
  ForgotPassword: {
    screen: (props) => {
      return <ForgotPassword {...props.screenProps} onCancel={() => props.navigation.navigate('Main')} onSuccess={() => props.navigation.navigate('Main')} />
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

