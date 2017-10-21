import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet
       , Text, View, Image, Linking, TouchableHighlight, Button } from 'react-native';


export default class DealsList extends Component {
    constructor(props) {
        super(props);
        this.viewWebPost = this.viewWebPost.bind(this);
    }

    viewWebPost = (nav, item) => {
      nav.navigate('Browser', { url: item.url, title: item.title })
    }

    render() {
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
        const renderItem = ({item}) => {
            return (
                <View style={styles.dealContainer}>
                    <View style={styles.dealContHeader}>
                        <Text style={styles.pubTime}>{item.date}</Text>
                    </View>
                <TouchableHighlight onPress={() => this.viewWebPost(this.props.nav, item)} underlayColor='white'>
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
            )}

        return (
            <View style={styles.container}>
                <FlatList
                    data= {this.props.deals}
                    keyExtractor= {(item, ix) => item.id}
                    renderItem= {renderItem}
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