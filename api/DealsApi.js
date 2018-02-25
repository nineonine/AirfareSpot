'use strict';

import {
  API_RECENT_DEALS_URL
} from 'react-native-dotenv';

let Api = {

  fetchRecentDeals() {
    return fetch(API_RECENT_DEALS_URL)
      .then( (res) => res.json() )
      .then( (json) => json.posts )

  }

}

module.exports = Api;