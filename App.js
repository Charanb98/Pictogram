import React from 'react';
import * as firebase from 'firebase';
import Config from './config.js'
import Navigation from './src/screens/index'

console.ignoredYellowBox = [
  'Setting a timer'
  ];
  
export default class App extends React.Component {
  constructor(props){
    super(props);
    if (!firebase.apps.length){
        firebase.initializeApp(Config.FirebaseConfig);
    }
  }
  
  render() {
    return (
      <Navigation />
    );
  }
}
