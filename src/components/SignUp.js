/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
} from 'react-native';
import {
  Icon,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Button,
} from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

import MFAPrompt from './MFAPrompt'
import Auth from '../../lib/Categories/Auth';
import Constants from '../utils/constants';
import { colors } from 'theme';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import SocialButton from './SocialButton';


const styles = StyleSheet.create({
  bla: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  formContainer: {
    justifyContent: 'space-around',
    height: 420,
  },
  transparentButtonFB: {
    borderColor: '#3B5699',
    borderWidth: 2
  },
  buttonFBText: {
    fontSize: 17,
    color: '#3B5698'
  },
  transparentButtonTW: {
    marginTop: 15,
    borderColor: '#1DA1F2',
    borderWidth: 2
  },
  buttonTWText: {
    fontSize: 17,
    color: '#1DA1F2'
  },
  buttonBigText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  inline: {
    flexDirection: 'row'
  },
  buttonContainer: {
    paddingLeft: 19,
    paddingRight: 19
  },
})


class SignUp extends React.Component {
  static navigationOptions = {
    title: Constants.APP_NAME,
  }
  constructor(props) {
    super(props);

    this.state = {
      showMFAPrompt: false,
      username: '', // username is an actual customers email
      password: '',
      repeatPassword: 'check',
      errorMessage: '',
    };

    this.baseState = this.state;

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleMFAValidate = this.handleMFAValidate.bind(this);
    this.handleMFASuccess = this.handleMFASuccess.bind(this);
    this.handleMFACancel = this.handleMFACancel.bind(this);
    this.passwordsMatch = this.passwordsMatch.bind(this);
  }

  async handleSignUp() {
    const { username, password } = this.state;
    let userConfirmed = true;

    try {
      await new Promise((resolve, reject) => {
        Auth.handleNewCustomerRegistration(username, password, (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          userConfirmed = !!result.userConfirmed;
          resolve();
        });
      });

      this.setState({ errorMessage: '' });
    } catch (exception) {
      this.setState({ errorMessage: exception.message });
      return;
    }

    this.setState({ showMFAPrompt: !userConfirmed });

    if (userConfirmed) {
        console.log("are we here ?")
      this.onSignUp();
    }

  }

  async handleMFAValidate(code = '') {
    try {
      await new Promise((resolve, reject) => {
        Auth.handleSubmitVerificationCode(this.state.username, code, (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result);
        });
      });

    } catch (exception) {
      return exception.message || exception;
    }

    return true;
  }

  handleMFACancel() {
    this.setState({ showMFAPrompt: false })
  }

  handleMFASuccess() {
    this.setState({ showMFAPrompt: false });

    this.onSignUp();
  }

  onSignUp() {
    this.setState(this.baseState);

    this.props.onSignUp();
  }

  passwordsMatch(p1, p2) {
    return p1 === p2l
  }

  render() {
    return (
      <View style={styles.bla}>
        <View style={styles.formContainer}>

        <View style={styles.buttonContainer}>
            <SocialButton
                styles={{button: styles.transparentButtonFB}}
                // onPress={this.press.bind(this)}
                >
                <View style={styles.inline}>
                    <FAIcon name="facebook-official" size={25} color="#3B5698" />
                    <Text style={[styles.buttonBigText, styles.buttonFBText]}>  Connect </Text>
                    <Text style={styles.buttonFBText}>with Facebook</Text>
                </View>
            </SocialButton>
        </View>
        <View style={styles.buttonContainer}>
            <SocialButton
                styles={{button: styles.transparentButtonTW}}
                // onPress={this.press.bind(this)}
                >
                <View style={styles.inline}>
                    <FAIcon name="twitter" size={25} color="#1DA1F2" />
                    <Text style={[styles.buttonBigText, styles.buttonTWText]}>  Connect </Text>
                    <Text style={styles.buttonTWText}>with Twitter</Text>
                </View>
            </SocialButton>
        </View>

          <View>
            <FormValidationMessage>{this.state.errorMessage}</FormValidationMessage>
            <FormLabel>Email</FormLabel>
            <FormInput
              editable
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              underlineColorAndroid="transparent"
              placeholder="Enter your Email"
              returnKeyType="next"
              ref="username"
              textInputRef="usernameInput"
              onSubmitEditing={() => { this.refs.password.refs.passwordInput.focus() }}
              value={this.state.username}
              onChangeText={username => this.setState({ username })} />
            {false && <FormValidationMessage>Error message</FormValidationMessage>}
          </View>
          <View>
            <FormLabel>Password</FormLabel>
            <FormInput
              editable
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              placeholder="Enter your Password"
              returnKeyType="next"
              ref="password"
              textInputRef="passwordInput"
            //   onSubmitEditing={() => { this.refs.repeatPassword.refs.repeatPasswordInput.focus() }}
              secureTextEntry
              value={this.state.password}
              onChangeText={password => this.setState({ password })} />
            {false && <FormValidationMessage>Error message</FormValidationMessage>}
          </View>
          {/* <View>
            <FormLabel>Repeat Password</FormLabel>
            <FormInput
              editable
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              placeholder="Enter your Password"
              returnKeyType="next"
              ref="repeatPassword"
              textInputRef="repeatPasswordInput"
            //   onSubmitEditing={() => { return }}
              secureTextEntry
              value={this.state.repeatPassword}
              onChangeText={repeatPassword => this.setState({ repeatPassword })} />
            {false && <FormValidationMessage>Error message</FormValidationMessage>}
          </View> */}
          <Button
            raised
            large
            title="Sign Up"
            backgroundColor={colors.primary}
            icon={{ name: 'lock', size: 18, type: 'font-awesome' }}
            onPress={this.handleSignUp} />
          {this.state.showMFAPrompt &&
            <MFAPrompt
              onValidate={this.handleMFAValidate}
              onCancel={this.handleMFACancel}
              onSuccess={this.handleMFASuccess}
            />}
        </View>
      </View>
    );
  }
}

const SignUpStack = StackNavigator({
  SignUp: {
    screen: props => <SignUp {...props} onSignUp={props.screenProps.onSignUp} />,
    navigationOptions: {
      title: Constants.APP_NAME,
    }
  },
});

export default props => <SignUpStack screenProps={{ onSignUp: props.onSignUp }} />;
