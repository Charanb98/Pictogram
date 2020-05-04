import React from 'react';
import { StyleSheet, Text, View, Image,Dimensions } from 'react-native';
import * as firebase from 'firebase';
import Constants from 'expo-constants';
import { Header, Icon, ListItem, Button } from 'react-native-elements';
import { ScrollView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Swiper from 'react-native-swiper';
console.disableYellowBox = true;

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;


export default class Main extends React.Component{
  constructor(props) {
    super(props);
    this.listingsRef = firebase.database().ref('images');
    this.state = {
      images: [],
      new_image: [],
    }
  }
componentDidMount(){
    this.listenForListingsData(this.listingsRef);
  }

_OnButtonPress(post) {
  this.props.navigation.navigate('ImagesInfo', {
    post: post,
  })
}

listenForListingsData(listingsRef) {
    listingsRef.on('value', (dataSnapshot) => {
      var images = [];
      dataSnapshot.forEach((child) => {
        images.push({
            key: child.key,
            location: child.val().location,
            caption: child.val().caption,
            photos: child.val().photos,
          });
        this.setState({
          images: images
        });
    });
  });
}


  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <View style={styles.container}>
        <View>
          <Header
            containerStyle={{
              backgroundColor: '#fff',
            }}
            centerComponent={{
              text: 'Feed',
              style: { color: '#3498db', fontWeight: 'bold', fontSize: 18 },
            }}
            rightComponent={
              <Icon
                name="ios-add-circle-outline"
                type="ionicon"
                color='#3498db'
                onPress={() => this.props.navigation.navigate('AddList')}
                underlayColor={'#64b5f6'}
              />
            }
          />
        </View >
        <ScrollView onScroll={this.handleScroll}>
          {this.state.images.map((u, i) => {
            if ((this.state.images).length != 0) {
              return (
              <Swiper
                renderPagination={renderPagination}
                horizontal={true}
                loop={false}
                key={i}
              > 
              <View style={styles.slide}>
              <Image
               style={styles.image}
               source={(u.photos != undefined && (u.photos).length >= 1) ? {uri: "data:image/png;base64," + u.photos[0].base64} : require('../img/Pictogram.png')}
              />
              <Button
                backgroundColor='#03A9F4'
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='Click for more details'
                onPress={() => this._OnButtonPress(u)}
              />
              </View>
              {((u.photos).length >= 2)?
              <Image
                  style={styles.image}
                  source={(u.photos != undefined && (u.photos).length != 0) ? {uri: "data:image/png;base64," + u.photos[1].base64} : require('../img/Pictogram.png')}
               />  
              :  null
             }
             {((u.photos).length >= 3)?
              <Image
                  style={styles.image}
                  source={(u.photos != undefined && (u.photos).length != 0) ? {uri: "data:image/png;base64," + u.photos[2].base64} : require('../img/Pictogram.png')}
               />  
              :  null
             }
             {((u.photos).length >= 4)?
              <Image
                  style={styles.image}
                  source={(u.photos != undefined && (u.photos).length != 0) ? {uri: "data:image/png;base64," + u.photos[3].base64} : require('../img/Pictogram.png')}
               />  
              :  null
             }
             {((u.photos).length >= 5)?
              <Image
                  style={styles.image}
                  source={(u.photos != undefined && (u.photos).length != 0) ? {uri: "data:image/png;base64," + u.photos[4].base64} : require('../img/Pictogram.png')}
               />  
              :  null
             }
              </Swiper>
              );
            }
          })}
        </ScrollView>
      </View>
      </View>
    );
  }
}

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'white' }}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  topMenu: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'palegreen',
    fontSize: 20
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    width,
    flex: 1
  }
});
