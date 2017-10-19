import React, { Component } from 'react';
import { Platform, View, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import FitImage from 'react-native-fit-image';

import Container from '../components/Container';
import Button from '../components/Button';
import Label from '../components/Label';

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
          <ScrollView style={styles.scroll}>

            <Container style={styles.imageLogoContainer}>
                <FitImage
                  source={require('../../assets/images/AFS_LOGO05.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
            </Container>

            <Container>
                <Button
                    label="Forgot Login/Pass"
                    styles={{button: styles.alignRight, label: styles.label}}
                    // onPress={this.press.bind(this)}
                    />
            </Container>

            <Container style={styles.formLabelContainer}>
                <Label text="Email" />
                <TextInput
                    style={styles.textInput}
                />
            </Container>

            <Container style={styles.formLabelContainer}>
                <Label text="Password" style={{marginTop: 10}}/>
                <TextInput
                    secureTextEntry={true}
                    style={styles.textInput}
                />
            </Container>

            <Container>
                <Button
                    styles={{button: styles.transparentButtonFB}}
                    // onPress={this.press.bind(this)}
                    >
                    <View style={styles.inline}>
                        <Icon name="facebook-official" size={30} color="#3B5698" />
                        <Text style={[styles.buttonBigText, styles.buttonFBText]}>  Connect </Text>
                        <Text style={styles.buttonFBText}>with Facebook</Text>
                    </View>
                </Button>
            </Container>

            <Container>
                <Button
                    styles={{button: styles.transparentButtonTW}}
                    // onPress={this.press.bind(this)}
                    >
                    <View style={styles.inline}>
                        <Icon name="twitter" size={30} color="#1DA1F2" />
                        <Text style={[styles.buttonBigText, styles.buttonTWText]}>  Connect </Text>
                        <Text style={styles.buttonTWText}>with Twitter</Text>
                    </View>
                </Button>
            </Container>

          </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#efefef',
    padding: 30,
    flexDirection: 'column',
  },
  label: {
    color: '#0d8898',
    fontSize: 16,
  },
  formLabelContainer: {
    paddingTop: 30,
  },
  alignRight: {
    alignSelf: 'flex-end'
  },
  textInput: {
    height: 60,
    fontSize: 30,
    backgroundColor: '#FFF'
  },
  transparentButtonFB: {
    marginTop: 30,
    borderColor: '#3B5699',
    borderWidth: 2
  },
  buttonFBText: {
    fontSize: 20,
    color: '#3B5698'
  },
  transparentButtonTW: {
    marginTop: 30,
    borderColor: '#1DA1F2',
    borderWidth: 2
  },
  buttonTWText: {
    fontSize: 20,
    color: '#1DA1F2'
  },
  buttonBigText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  inline: {
    flexDirection: 'row'
  },
  imageLogoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    borderRadius: 20,
    height: 100,
    width: 350
  }
})
