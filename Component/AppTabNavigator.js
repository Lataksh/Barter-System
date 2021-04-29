import React from 'react';
import { Image } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ExchangeRequest from '../Screens/ExchangeRequest';

export const AppTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: <Image source={require('../assets/BookDonate.jpg')} style={{ width: 35, height: 35, borderRadius: 50 }} />,
            tabBarLabel: "Home"
        }
    },
    Exchange: {
        screen: ExchangeRequest,
        navigationOptions: {
            tabBarIcon: <Image source={require('../assets/bookrequest.jpg')} style={{ width: 35, height: 35, borderRadius: 50 }} />,
            tabBarLabel: "Exchange"
        }
    }
})