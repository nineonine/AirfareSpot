import React, { Component } from 'react';
import { WebView, View, Text } from 'react-native';

export default class InternalBrowser extends Component {

  render() {

    const { params } = this.props.navigation.state;

    return (
        <WebView
          source={{uri: params.url}}
        />
    );
  }
}