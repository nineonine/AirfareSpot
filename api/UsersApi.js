'use strict';

import {
  API_FETCH_USER_SETTINGS,
  API_SAVE_USER_SETTINGS
} from 'react-native-dotenv';

let Api = {

  async fetchUserSettings(email) {
    let endpoint = API_FETCH_USER_SETTINGS + email;
    try {
      let response = await fetch(endpoint);
      let responseJson = await response.json();
      return responseJson

    } catch(e) {
      console.error("There was a problem loading user settings: " + error);
    }
  },

  async saveUserSettings(email, settings) {

    let requestSettings = {
        method: "POST"
      , headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      , body: JSON.stringiry(settings)
    }

    try {
      let response = await fetch(API_SAVE_USER_SETTINGS, requestSettings);
      let responseJson = await response.json();
      return responseJson

    } catch(e) {
        console.error("There was a problem saving user settings: " + error);
    }
  }
}

module.exports = Api;