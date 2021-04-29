import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import db from '../db.js';
import firebase from 'firebase';
import SideDrawer from './SideDrawer.js';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {AppTabNavigator} from './AppTabNavigator.js';
import Settings from '../Screens/Settings.js'

export const DrawerNavigator = createDrawerNavigator({
    
    Home: {
        screen: AppTabNavigator,
    },
    Settings : {
        screen : Settings
    },
},
    {
        contentComponent: SideDrawer
    },
    {
        initialRouteName: 'Settings'
    }
)
