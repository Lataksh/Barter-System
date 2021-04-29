import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import {Header} from 'react-native-elements';

const HeaderComponent = props=>{
    return(
        <Header 
            centerComponent = {{
                text:props.title,
                style : {
                    fontSize : 30,
                    fontWeight : 'bold', 
                    width:window.innerWidth, 
                    textAlign:'center',
                    backgroundColor:'red',
                }
            }}

        />
    )
}

export default HeaderComponent;


