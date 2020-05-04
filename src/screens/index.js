import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import Main from './Main';
import AddList from './AddListing';
import DeleteAccount from './DeleteAccount';
import LogOut from './Logout';
import Settings from './Settings';
import ImagesInfo from './ImagesInfo';
console.disableYellowBox = true;

const MainStack = createStackNavigator();
const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();
function RootMainStack() {
  return (
      <MainStack.Navigator
        screenOptions={{headerShown: false}}
      >
      <MainStack.Screen
        name="Login"
        component={Login}
      />
      <MainStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <MainStack.Screen
        name="SignUp"
        component={SignUp}
      />
      <MainStack.Screen
        name="Main"
        component={RootTab}
      />
      </MainStack.Navigator>
  );
}

const TabNavigator = createBottomTabNavigator();
function RootTab () {
  return (
  <TabNavigator.Navigator
  initialRouteName="Home"
  >
    <TabNavigator.Screen
      name="Home"
      component={RootHomeStack}
      screenOptions={{tabBarIcon: ({ tintColor }) => <Icon name="home" size={25} type="entypo" color={tintColor}/>}}
    />
    <TabNavigator.Screen
      name="Settings"
      component={SettingTab}
      screenOptions={{tabBarIcon: ({ tintColor }) => <Icon name="setting" type="antdesign" size={25} color={tintColor} />}}
    />
  </TabNavigator.Navigator>
  );
}
function SettingTab () {
    return (
    <SettingStack.Navigator
    screenOptions={{headerShown: false}}
    >
    <SettingStack.Screen
      name="Settings"
      component={Settings}
    />
    <SettingStack.Screen
      name="DeleteAccount"
      component={DeleteAccount}
    />
    <SettingStack.Screen
      name="LogOut"
      component={LogOut}
    />
  </SettingStack.Navigator>
  );
}
function RootHomeStack () {
    return (
    <HomeStack.Navigator
    screenOptions={{headerShown: false}}
    >
    <HomeStack.Screen
      name="Main"
      component={Main}
    />
    <HomeStack.Screen
      name="AddList"
      component={AddList}
    />
    <HomeStack.Screen
      name="ImagesInfo"
      component={ImagesInfo}
    />
  </HomeStack.Navigator>
  );
}
export default class Index extends React.Component {
  render () {
    return (
     <NavigationContainer> 
        {RootMainStack()}  
      </NavigationContainer>
    );
  }
}
