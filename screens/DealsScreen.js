import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';

let data = [
    {title: "Los Angeles to San Francisco", pubDate: "2017-06-17 17:30:14", key:1}
  , {title: "Charlotte to Los Angeles", pubDate: "2017-06-17 16:41:39", key:2}
  , {title: "Dallas to Washington", pubDate: "2017-06-17 16:21:32", key:3}
  , {title: "Philadelphia to New Orleans", pubDate: "2017-06-17 15:59:29", key:4}
  , {title: "Fort Lauderdale to Aguadilla", pubDate: "2017-06-17 15:40:55", key:5}
]

export default class DealsScreen extends Component {


  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem= { ({item}) =>
            <View style={styles.dealContainer}>
                <View style={styles.dealContHeader}>
                    <Text style={styles.pubTime}>{item.pubDate}</Text>
                </View>
                <View style={styles.dealContBody}>
                    <Text style={styles.item}>
                      {item.title}
                    </Text>
                    <Image
                      source={{uri:'https://i.ytimg.com/vi/QX4j_zHAlw8/maxresdefault.jpg'}}
                    //   source={require('../assets/images/deal-placeholder-icon.jpg')}
                      style={styles.dealImage}
                    />
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
  item: {
    padding: 7,
    fontSize: 18,
    height: 44,
    flex: 3,
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
    backgroundColor: '#ffeeed',
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
    // flex: 1,
    borderRadius: 50,
  },
  pubTime: {
    paddingRight: 10,

  },
})