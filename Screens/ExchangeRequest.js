import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import db from '../db.js'
import firebase from 'firebase';
import HeaderComponent from '../Component/Header.js'


export default class ExchangeRequest extends React.Component {
    constructor() {
        super();
        this.state = {
            itemName: '',
            reason: '',
            userID : firebase.auth().currentUser.email
        }
    }
    

    uniqueID(){
        return(
            Math.random().toString(15).substring(5)
        )
    }

    userRequest=async(itemname, reason)=>{
        var updateUserId = this.state.userID;
        var uniqueId = this.uniqueID();
        if(itemname !== '' && reason !==''){
            await db.collection('Exchange_Requests').add({
                UserID : updateUserId,
                Item_Name : itemname,
                reason : reason,
                UniqueID : uniqueId
            })
            this.setState({
                itemName : '',
                reason:''
            })
            alert("Item ready to be exchang")
        }else{
            alert("Please enter something")
        }
      
    }


    render() {
        return (
            <View>
                <HeaderComponent title="Exchange Items" />
                <KeyboardAvoidingView behavior={'padding'} enabled style={{ justifyContent: 'center' }}>
                    <TextInput
                        placeholder={'Item Name'}
                        onChangeText={(text) => {
                            this.setState({
                                itemName: text
                            })
                        }}
                        style={{
                            borderWidth: 2,
                            marginTop: 50,
                            margin: 5,
                            marginRight:50,
                            padding: 5,
                            width: window.innerWidth,
                            height: 40,
                            backgroundColor: 'white',
                        }}
                        value = {this.state.itemName}
                    />

                    <TextInput
                        placeholder={'reason'}
                        multiline 
                        numberOfLines = {5}
                        onChangeText={(text) => {
                            this.setState({
                                reason: text
                            })
                        }}
                        style={{
                            borderWidth: 2,
                            marginTop: 10,
                            margin: 5,
                            padding: 5,
                            width: window.innerWidth,
                            height: 40,
                            backgroundColor: 'white'
                        }}
                        value = {this.state.reason}
                    />

                    <TouchableOpacity style = {{
                        backgroundColor: '#4e3620',
                        width: 100,
                        height: 50,
                        marginLeft: 210,
                        marginTop: 10,
                        borderRadius: 10,
                        alignSelf:'center',
                        justifyContent:'center',
                    }} onPress={()=>{
                        this.userRequest(this.state.itemName, this.state.reason)
                    }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            fontSize: 20,
                        }}>Exchange</Text>
                    </TouchableOpacity>


                </KeyboardAvoidingView>

            </View>
        )
    }
}