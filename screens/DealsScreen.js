import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet
       , Text, View, Image, Linking, TouchableHighlight, Button } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

let Api = require('../api/DealsApi');

export default class DealsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        deals: []
      , dealsLoaded: false
    }
  }

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

    const { navigate } = this.props.navigation;

    const getAllTags = (a) => {
      return a.categories.map(c => c.title)
    }

    const renderTags = (ts) => {
      return (
        ts.map( (t,i) => {
          return (
            <Text key={i} style={styles.dealTag}>{"#" + t}</Text>
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
          keyExtractor= {(item, ix) => item.id}
          renderItem= { ({item}) =>

            <View style={styles.dealContainer}>

              <View style={styles.dealContHeader}>
                <Text style={styles.pubTime}>{item.date}</Text>
              </View>

              <TouchableHighlight onPress={() => navigate('Browser', { url: item.url, title: item.title })} underlayColor='white'>
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
              </TouchableHighlight>

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
    // paddingTop: 2
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