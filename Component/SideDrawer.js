import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import db from '../db.js';
import firebase from 'firebase';
import LoginScreen from '../Screens/LoginScreen.js';
import Settings from '../Screens/Settings.js'

export default class SideDrawer extends React.Component {
    render() {
        return (
            <View>
                <View>
                    <DrawerItems {...this.props} />
                </View>
                <View>
                    <TouchableOpacity style={{
                         backgroundColor: '#e6e6e6',
                         borderRadius: 5,
                        height: 50 }} onPress={() => {
                        this.props.navigation.navigate('Loginscreen');
                        firebase.auth().signOut();
                    }}>
                        <Text style = {{
                            color: '#2196f3',
                            fontWeight : 'bold',
                            textAlign : 'left',
                            marginTop:15,
                            marginLeft : 15
                        }}>LogOut</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
