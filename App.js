import React from 'react';
import LoginScreen from './Screens/LoginScreen.js';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeScreen from './Screens/HomeScreen';
import ExchangeRequest from './Screens/ExchangeRequest';
import {DrawerNavigator} from './Component/DrawerNavigator.js';
import Settings from './Screens/Settings'
import ReceiverDetails from './Screens/ReceiverDetails'

export default function App() {
  return (
    <AppContainer />
  );
}

const SwitchNavigator = createSwitchNavigator({
  Drawer : {screen : DrawerNavigator},
  Loginscreen: { screen: LoginScreen },



})

const AppContainer = createAppContainer(SwitchNavigator);