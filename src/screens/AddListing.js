import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
  TextInput,
  View,
  Platform,
} from 'react-native';
import uuid from 'uuid';
import * as firebase from 'firebase';
import { Header, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
console.disableYellowBox = true;

export default class AddListing extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            location: null,
            caption: null,
            uploaded_photos: [],
            uploading: false,
            uid: null,
            submitted: false
          }
    } 
  
  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }
  componentDidUpdate(){
    if (this.state.submitted == true && this.state.uploading == false)
    {
      this.submitImages();
    }
  }

  render() {
    return (
        <ScrollView>
         <View style={styles.container}>
            <View>
                <Header
                    containerStyle={{
                    backgroundColor: '#fff',
                    }}
                    centerComponent={{
                        text: 'Add Images',
                        style: { color: '#3498db', fontWeight: 'bold', fontSize: 18},
                    }}
                    leftComponent={
                        <Icon
                            name="md-arrow-back"
                            type="ionicon"
                            color='#3498db'
                            onPress={() => this.props.navigation.pop()}
                            underlayColor={'#64b5f6'}
                        />
                    }
                />
            </View>
            <ScrollView
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableOnAndroid={true}
                    enableAutoAutomaticScroll={(Platform.OS === 'ios')}
                    scrollEnabled={(Platform.OS === 'ios')}
                    contentContainerStyle={{alignItems: 'center', marginTop: height * 0.03}}
                    getTextInputRefs={() => {
                    return [this.captionInput,this.locationInput];
                    }} 
                >
                    <TextInput 
                        placeholder = "Caption"
                        multiline
                        onChangeText={(val) => this.setState({caption:val})}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        ref = {(input) => this.captionInput = input}
                        style={styles.input}
                    />
                    <TextInput 
                        placeholder = "Location"
                        onChangeText={(val) => this.setState({location:val})}
                        placeholderTextColor="rgba(255,255,255,0.7)"
                        ref = {(input) => this.locationInput = input}
                        style={styles.input}
                    /> 
                    <View style= {{flexDirection: 'row',flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>                
                            <TouchableOpacity onPress={this._pickImage} style={styles.buttonContainer}>
                                  <Text style={styles.buttonText}> Add Image </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>                
                            <TouchableOpacity onPress={this._takePhoto} style={styles.buttonContainer}>
                                <Text style={styles.buttonText}> Take Photo </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>                
                        <TouchableOpacity onPress={this.checkInput} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}> Submit </Text>
                        </TouchableOpacity>
                    </View>
                    
                </ScrollView>
          </View>
        </ScrollView>
    );
  }

  submitImages = () => {
    const db = firebase.database();
    const images = db.ref().child("images");
    console.log("here");
    console.log(this.state.uploaded_photos);
    images.push().set({
        location: this.state.location,
        caption: this.state.caption,
        photos: this.state.uploaded_photos,
        uid: firebase.auth().currentUser.uid
    }).then(Alert.alert("Submitted Successfully"), this.props.navigation.navigate('Main'))
    .catch(error => console.log(error))
  };

  checkInput = () => {
    if (this.state.location == null) alert('Enter a location please!');
    else if (this.state.caption == null) alert('Enter a caption please!');
    else if (this.state.uploading == true) alert('Uploading photo. Please try again.');
    else {
      this.submitImages();
    }
  }; 

  _pickImage = async () => {
    try {
      this.setState({uploading: true});
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!pickerResult.cancelled) {
        this.state.uploaded_photos.push(pickerResult);
      }
      console.log(pickerResult);
    } catch (E) {
      console.log(E)
    }
    finally {
      this.setState({ uploading: false });
    }
  };

  _takePhoto = async () => {
    try {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true,
      });
      if (!pickerResult.cancelled) {
        this.state.uploaded_photos.push(pickerResult);
      }
      console.log(pickerResult);
    } catch (E) {
      console.log(E);
    }
  };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
    },
    inputStyle: {
        flex: 1,
    },
    input: {
        height: height * 0.05,
        width: width * 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'rgba(255,255,255,0.2)',
        marginBottom: height * 0.05,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
        marginTop: 15,
        marginBottom: 15
    },
    buttonText: {
        textAlign: 'center',
        color: "#FFFFFF"
    }
});
