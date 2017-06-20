import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DealsScreen from './screens/DealsScreen';

export default class App extends React.Component {
  render() {
    return (
        <DealsScreen />
    );
  }
}

{/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */}
