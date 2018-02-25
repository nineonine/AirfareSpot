import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet
       , Text, View, Image
       , Button, Dimensions
       , Switch, ScrollView } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

import { colors } from 'theme';
import CategoriesApi from '../../api/CategoriesApi'
import UsersApi from '../../api/UsersApi'

const { width } = Dimensions.get('window');

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userEmail: "No email"
      , receiveEmailNewsletter: true
      , receivePushNotsForMy: true
      , unsavedChanges: false
      , selectedCategories: []
      , allCategories: []
      , profileLoaded: false
    }

    this.onSelectionsChange = this.onSelectionsChange.bind(this);
    this.onSwitchEmailNewsletterToggle = this.onSwitchEmailNewsletterToggle.bind(this);
    this.onSwitchNotsMyToggle = this.onSwitchNotsMyToggle.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);

  }

  onSelectionsChange = (selectedCats) => {
      this.setState({selectedCategories: selectedCats, unsavedChanges: true})
  }

  onProfileLoaded = (categories) => {
    this.setState( (prevSt) => {
      return {selectedCategories: categories, profileLoaded: true}
    })
  }

  onSwitchEmailNewsletterToggle = () => {
    this.setState( (prevSt) => {
      return {receiveEmailNewsletter: !this.state.receiveEmailNewsletter}
    })
  }

  onSwitchNotsMyToggle = () => {
    this.setState( (prevSt) => {
      return {receivePushNotsForMy: !this.state.receivePushNotsForMy}
    })
  }

  async handleSaveClick() {
    // let settings  = {
    //     receiveEmailNewsletter: this.state.receiveEmailNewsletter
    //   , receivePushNotsForMy: this.state.receivePushNotsForMy
    //   , selectedCategories: this.state.selectedCategories
    // }
    //
    //
    //
    // UsersApi.saveUserSettings()
    let result = await UsersApi.fetchUserSettings("mail4chemik@gmail.com");
    console.log(result)
  }

  componentDidMount() {
    CategoriesApi.fetchCategories()
      .then( (cats) => this.setState( (prevSt) => {return {allCategories: cats, profileLoaded: true}}))
      .catch( (e) => {
        alert('Something went wrong! :(' + e.message);
        console.log(e)
    })

  }


  render() {
      return(
          <ScrollView style={styles.bla}>

              <View style={[styles.titleContainer, {paddingTop: 30}]}>
                  <Text style={styles.screenTitle}>
                      Profile Settings
                  </Text>
              </View>

              <View style={styles.imageContainer}>
                <Image
                  resizeMode='contain'
                  source={require('../../assets/images/profile.png')}
                  style={styles.profilePic}
                />
              </View>

              <View style={styles.emailContainer}>
                  <Text style={styles.userEmail}>
                      {this.state.userEmail}
                  </Text>
              </View>

              <View style={styles.changePwdLinkContainer}>
                  <Text style={styles.changePwdLinkText}
                        onPress={() => this.props.rootNav.navigate('ForgotPassword')}>
                      Change password</Text>
                  </View>

              <View style={styles.logoutLinkContainer}>
                  <Text style={styles.logoutLinkText}> Log out</Text>
              </View>

              <View style={styles.titleContainer}>
                  <Text style={styles.screenTitle}>
                      Notification Settings
                  </Text>
              </View>


              <View style={styles.switchContainer}>
                  <Text style={styles.switchLabel}>
                      Email newsletter
                  </Text>
                  <View style={{paddingRight: 10}}>
                      <Switch value={this.state.receiveEmailNewsletter}
                          onValueChange={this.onSwitchEmailNewsletterToggle}
                          style={styles.switchStyle}
                      />
                  </View>
              </View>

              <View style={styles.switchContainer}>
                  <Text style={styles.switchLabel}>
                      Receive only my deals
                  </Text>
                  <View style={{paddingRight: 10}}>
                      <Switch value={this.state.receivePushNotsForMy}
                          onValueChange={this.onSwitchNotsMyToggle}
                          style={styles.switchStyle}
                      />
                  </View>
              </View>

              <View style={styles.titleContainer}>
                  <Text style={styles.screenTitle}>
                      My Categories
                  </Text>
              </View>

              <View style={styles.mSelectContainer}>
                  <SelectMultiple
                      items={this.state.allCategories}
                      selectedItems={this.state.selectedCategories}
                      onSelectionsChange={this.onSelectionsChange}
                      selectedRowStyle={styles.selectedCategoryRow}
                      labelStyle={styles.selectLabelText}
                  />
              </View>

              <View style={styles.saveButtonContainer}>
                  <Button
                      title="Save"
                      disabled={!this.state.unsavedChanges}
                      color={colors.primary}
                      onPress={this.handleSaveClick} />
              </View>

          </ScrollView>
      )
  }
}

const styles = StyleSheet.create({
  bla: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bla: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F6F8FA',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ededed',
  },
  screenTitle: {
    textAlign: 'center',
    fontSize: 20,
  },
  profilePic: {
    width: width / 2,
    height: width / 2,
  },
  imageContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 15,
  },
  emailContainer: {
    paddingBottom: 12,
  },
  userEmail: {
    textAlign: 'center',
    fontSize: 20,
  },
  changePwdLinkContainer: {
    paddingBottom: 10,
  },
  changePwdLinkText: {
    textAlign: 'center',
    color: '#EE5E69',
  },
  logoutLinkContainer: {
    paddingBottom: 20,
  },
  logoutLinkText: {
    textAlign: 'center',
    color: '#EE5E69',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  switchStyle: {
    alignSelf: 'flex-end',
  },
  switchLabel: {
    paddingLeft: 10,
    fontSize: 18,
  },
  selectedCategoryRow: {
    backgroundColor: "#77ef93",
  },
  selectLabelText: {
    fontSize: 16,
  },
  saveButtonContainer: {
    marginBottom: 20,
  },
  mSelectContainer: {
    paddingBottom: 12,
  }
});


 export default (props) => {
   const { screenProps, rootNavigator, ...otherProps } = props;

   return <Settings screenProps={{ rootNavigator, ...screenProps, ...otherProps }} />
 };