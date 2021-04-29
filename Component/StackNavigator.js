import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import {AppTabNavigator} from './AppTabNavigator.js'
import ReceiverDetail from '../Screens/ReceiverDetails.js'


const stackNavigator = createStackNavigator({
    HomeScreen: {
        screen: AppTabNavigator
    },
    Details: {
        screen: ReceiverDetails
    }
},
    {
        initialRouteName: 'HomeScreen'
    },

)

export default class StackNavigator extends React.Component{
    render(){
        return(
            <stackNavigator/>
        )
    }
}