import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions
} from "react-native";
import  Constants  from "expo-constants";
import { Header, Icon, ListItem } from "react-native-elements";
import * as firebase from "firebase";
import MapView from "react-native-maps";
var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;
export default class ImagesInfo extends React.Component {
  constructor(props) {
    super(props);
    const post = this.props.route.params?.post;
    this.state = {
      list: [
        {
          name: "Location",
          leftIcon: { name: "location", color: "fff", type: "entypo" },
          subtitle: post.location
        }
      ],
      leaseruid: post.uid,
      currentuid: firebase.auth().currentUser.uid,
      key: post.key
    };
  }
   componentDidMount() {
    var address = this.props.route.params?.post.location.split(" ").join("+");
    var url =
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      address +
      "&key=AIzaSyBW6G0Ezw0bl0EMcfJ2WSCkseyeh8x4WvE";
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        console.log(res.results[0].geometry.location);
        var location = res.results[0].geometry.location;
        this.setState({
          geoLoco: { lat: location.lat, long: location.lng },
          coordReady: true
        });
      })
      .catch(error => {
        alert(error);
      });
  }  
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Header
            containerStyle={{
              backgroundColor: "#fff"
            }}
            centerComponent={{
              text: "More Info",
              style: { color: "#3498db", fontWeight: "bold", fontSize: 18 }
            }}
            leftComponent={
              <Icon
                name="md-arrow-back"
                type="ionicon"
                color="#3498db"
                onPress={() => this.props.navigation.pop()}
                underlayColor={"#64b5f6"}
              />
            }
          />
        </View>
         <ScrollView
          onScroll={this.handleScroll}
          style={{ marginTop: 15, marginBottom: 15 }}
        >
          {this.state.coordReady ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: this.state.geoLoco.lat,
                longitude: this.state.geoLoco.long,
                longitudeDelta: 10,
                latitudeDelta: 10
              }}
              onMapReady={() => {
                this.setState({ mapReady: true });
              }}
            >
              {this.state.mapReady ? (
                <MapView.Marker
                  coordinate={{
                    latitude: this.state.geoLoco.lat,
                    longitude: this.state.geoLoco.long
                  }}
                />
              ) : null}
            </MapView>
          ) : null}
          <View style={{ marginTop: height * 0.52 }}>
            {this.state.list.map((u, i) => {
              if (this.state.list.length != 0) {
                console.log("key value of the info",{i})
                return (
                  <ListItem
                    topDivider={true}
                    bottomDivider={true}
                    style={{ paddingBottom: 2 }}
                    leftIcon={u.leftIcon}
                    key={i}
                    title={u.name}
                    subtitle={u.subtitle}
                  />
                );
              }
            })}
            </View>
          {this.state.currentuid.localeCompare(this.state.leaseruid) == 0 && (
            <TouchableOpacity
              onPress={() => this._delete(this.state.key)}
              transparent
              style={[styles.buttonContainer, { backgroundColor: "#2980b9" }]}
            >
              <Text style={{ textAlign: "center", color: "#FF0000" }}>
                {" "}
                Delete{" "}
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3498db",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight
  },
  topMenu: {
    backgroundColor: "rgba(255,255,255,0.2)"
  },
  errors: {
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: width * 0.8,
    padding: 5,
    marginTop: 10,
    color: "#fff",
    height: height * 0.05,
    marginBottom: height * 0.01
  },
  buttonContainer: {
    backgroundColor: "#2980b9",
    paddingVertical: 15
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF"
  },
  map: {
    position: "absolute",
    height: height * 0.5,
    width: width,
    flex: 1
  }
});