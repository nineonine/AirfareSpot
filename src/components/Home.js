import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet
       , Text, View, Image, Linking, TouchableHighlight, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

let Api = require('../../api/DealsApi');

import DealsList from './DealsList'
import IBrowser from './InternalBrowser'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        deals: []
      , dealsLoaded: false
    }
  }

  onAfterDealsLoad = (deals) => {
    this.setState( (prevSt) => {
      return{deals: deals, dealsLoaded: true}
    })
  }

  componentDidMount() {
      Api.fetchRecentDeals()
        .then( (deals) => this.onAfterDealsLoad(deals) )
        .catch( (e) => {
          alert('Something went wrong! :(' + e.message);
          console.log(e)
        })

  }


  render() {
    if (!this.state.dealsLoaded) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
        </View>
      );
    }

    return (
        <View style={styles.container}>
            <DealsList deals={this.state.deals} nav={this.props.navigation}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 2
  }
 });

const HomeScreenStack = {
    Deals: {
      screen: Home,
      path: '/',
      navigationOptions: () => ({
        title: 'Latest Deals',
      }),
    },
    Browser: {
      screen : IBrowser,
      path: '/deal',
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params.title
      }),
    },
};

const HomeNav = StackNavigator(HomeScreenStack);

export default (props) => {
  const { screenProps, rootNavigator, ...otherProps } = props;

  return <HomeNav screenProps={{ rootNavigator, ...screenProps, ...otherProps }} />
};


