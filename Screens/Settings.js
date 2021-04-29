import React from 'react';
import { View, TextInput, TouchableOpacity, Alert, Text } from 'react-native';
import db from '../db.js'
import firebase from 'firebase';
import HeaderComponent from '../Component/Header.js'

export default class Settings extends React.Component {
    constructor() {
        super()
        this.state = {
            FirstName: '',
            LastName: '',
            Address: '',
            ContactNo: '',
            docId: ''
        }
    }

    saveDetails = () => {
        var user = firebase.auth().currentUser;
        var userEmail = user.email;

        db.collection('user').where('Email_ID', '==', userEmail).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    var data = doc.data();
                    this.setState({
                        FirstName: data.First_Name,
                        LastName: data.Last_Name,
                        Address: data.Address,
                        ContactNo: data.Contact_Number,
                        docId: doc.id
                    })
                })
            })
    }

    updateDatabase = () => {
        db.collection('user').doc(this.state.docId).update({
            'First_Name': this.state.FirstName,
            'Last_Name': this.state.LastName,
            'Address': this.state.Address,
            'Contact_Number': this.state.ContactNo
        })
        alert('Your Profile has been updated');
    }

    componentDidMount() {
        this.saveDetails();
    }


    render() {
        return (
            <View>
                <HeaderComponent title='Settings' />
                <View>
                    <Text style ={{ color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginTop: 15,
                            fontSize: 15,
                            width :100 ,
                            textAlign:'center'}}>Update Profile</Text>
                    <TextInput
                        style={{ borderWidth: 2, marginTop: 10, margin: 5, padding: 5, width: 320, height: 40, backgroundColor: 'white' ,borderRadius: 10, borderColor:'#00FFFF', marginLeft:10}}
                        placeholder={'First Name'}
                        maxLength={10}
                        onChangeText={(text) => {
                            this.setState({
                                FirstName: text
                            })
                        }}
                        value={this.state.FirstName}
                    />

                    <TextInput
                        style={{ borderWidth: 2, marginTop: 10, margin: 5, padding: 5, width: 320, height: 40, backgroundColor: 'white',borderRadius: 10, borderColor:'#00FFFF' }}
                        placeholder={'Last Name'}
                        maxLength={10}
                        onChangeText={(text) => {
                            this.setState({
                                LastName: text
                            })
                        }}
                        value={this.state.LastName}

                    />


                    <TextInput style={{ borderWidth: 2, marginTop: 10, margin: 5, padding: 5, width: 320, height: 40, backgroundColor: 'white' ,borderRadius: 10, borderColor:'#00FFFF'}}
                        placeholder={"Address"}
                        multiline={true}
                        onChangeText={(text) => {
                            this.setState({
                                Address: text
                            })
                        }}
                        value={this.state.Address}
                    />

                    <TextInput style={{ borderWidth: 2, marginTop: 10, margin: 5, padding: 5, width: 320, height: 40, backgroundColor: 'white' ,borderRadius: 10, borderColor:'#00FFFF'}}
                        placeholder={"Contact Number"}
                        maxLength={10}
                        keyboardType={'numeric'}
                        onChangeText={(text) => {
                            this.setState({
                                ContactNo: text
                            })

                        }}
                        value={this.state.ContactNo} />

                    <TouchableOpacity style={{
                        backgroundColor: 'red',
                        width: 320,
                        height: 50,
                        marginLeft:5,
                        marginTop: 40,
                        borderRadius: 10
                    }}
                        onPress={() => {
                            this.updateDatabase()
                        }}>
                        <Text style={{
                            color: 'Red',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            justifyContent:'center',
                            alignSelf:'center',
                            marginTop: 15,
                            fontSize: 15,
                            width :100 ,
                        }}>Save Changes</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}