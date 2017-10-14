import React, { Component } from 'react';
import { Button, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ProfileScreen extends Component {

    static navigationOptions = {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicons
          name={focused ? 'ios-cog' : 'ios-cog-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      ),
    };

    render() {
        return(
          <ScrollView>
              <Text>
                  {"PROFILE PAGE"}
              </Text>
              <Text>
                  {/* {"name: " + this.props.name} */}{"NAME"}
              </Text>
          </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2
  },
})
