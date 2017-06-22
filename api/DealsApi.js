'use strict';

let Api = {

  fetchRecentDeals() {

    let API_RECENT_DEALS_URL = "https://airfarespot.com/api/get_recent_posts/";

    return fetch(API_RECENT_DEALS_URL)
      .then( (res) => res.json() )
      .then( (json) => json.posts )

  }

}

module.exports = Api;