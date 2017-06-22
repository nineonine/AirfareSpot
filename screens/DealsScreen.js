import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native';

let Api = require('../api/DealsApi');

let ddata = [
  {title: "Los Angeles to San Francisco", date: "2017-06-17 17:30:14", key:1}
, {title: "Charlotte to Los Angeles", date: "2017-06-17 16:41:39", key:2}
, {title: "Dallas to Washington", date: "2017-06-17 16:21:32", key:3}
, {title: "Philadelphia to New Orleans", date: "2017-06-17 15:59:29", key:4}
, {title: "Fort Lauderdale to Aguadilla", date: "2017-06-17 15:40:55", key:5}
];

export default class DealsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        deals: []
      , dealsLoaded: false
    }
  }

  _keyExtractor = (item, ix) => item.id;

  onAfterDealsLoad = (deals) => {
    deals.map( v => {console.log(v.id); return v} );
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

    const getAllTags = (a) => {
      return a.categories.map(c => c.title)
    }

    const renderTags = (ts) => {
      return (
        ts.map( t => {
          return (
            <Text style={styles.dealTag}>{"#" + t}</Text>
          )
        })
      )
    }

    if (!this.state.dealsLoaded) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data= {this.state.deals}
          keyExtractor= {this._keyExtractor}
          renderItem= { ({item}) =>

            <View style={styles.dealContainer}>

                <View style={styles.dealContHeader}>
                    <Text style={styles.pubTime}>{item.date}</Text>
                </View>

                <View style={styles.dealContBody}>

                    <View style={styles.dealTextBlock}>
                      <Text style={styles.dealTitle}>
                        {item.title}
                      </Text>
                      <View style={styles.dealTags}>
                          {renderTags(getAllTags(item))}
                      </View>
                    </View>

                    <Image
                      source={{uri: item.thumbnail}}
                      style={styles.dealImage}/>
                </View>

            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  dealTextBlock: {
    flex: 3,
    paddingTop: 5,
    flexDirection: 'column',
  },
  dealTags: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dealTag: {
    backgroundColor: '#eee',
    padding: 3,
    margin: 3,
    fontSize: 12,
  },
  dealTitle: {
    fontWeight: '500',
    fontSize: 16,
  },
  dealContainer: {
    borderWidth: 1,
    borderColor: '#e2e2e2',
  },
  dealContHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 30,
  },
  dealContBody: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  dealImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 15,
  },
  pubTime: {
    paddingRight: 10,
    color: '#6b6b6b',
  },
})