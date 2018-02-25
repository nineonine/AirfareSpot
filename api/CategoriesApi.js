'use strict';

import LocalStorage from '../lib/Categories/LocalStorage';
import {
  API_US_CATEGORIES_URL
} from 'react-native-dotenv';


let Api = {

  async fetchCategories() {
    let cats;
    try {
      cats = JSON.parse(LocalStorage.getItem('usCategories'))
    } catch(e) {
      console.log("storage empty, had to fetch!")
      return cats || fetch(API_US_CATEGORIES_URL)
        .then( (res) => res.json() )
        .then( (json) => json.map( x => x.name))
        .then( (cats) => {LocalStorage.setItem('usCategories', JSON.stringify(cats));return cats})
    }
    return cats;
  }
}

module.exports = Api;