import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import db from '../db.js'
import firebase from 'firebase';
import SantaClaus from '../Component/SantaClaus.js'


export default class LoginScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            emailId: '',
            password: '',
            FirstName: '',
            LastName: '',
            Address: '',
            ContactNo: '',
            School: '',
            ConfirmPassword: '',
            FormVisible: false
        }
    }


    form = () => {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.state.FormVisible}>
                <View>
                    <ScrollView>
                        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center'}} behavior='padding' enabled>
                        <View style = {{ flex: 1, justifyContent: 'center', borderWidth:5, borderRadius:10, width:340,height:470, alignSelf:'center', marginTop:250, backgroundColor:'white'}}>
                            <Text style={{fontSize:20, textAlign:'center', fontWeight:'bold'}}>Enter Details Below</Text>
                            <TextInput style={styles.form}
                                placeholder={"First Name"}
                                maxLength={15}
                                onChangeText={(text) => {
                                    this.setState({
                                        FirstName: text
                                    })
                                }} />
                            <TextInput style={styles.form}
                                placeholder={"Last Name"}
                                maxLength={15}
                                onChangeText={(text) => {
                                    this.setState({
                                        LastName: text
                                    })
                                }} />
                                <TextInput style={styles.form}
                                placeholder={"School Name"}
                                multiline={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        School: text
                                    })
                                }} />
                            <TextInput style={styles.form}
                                placeholder={"Address"}
                                multiline={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        Address: text
                                    })
                                }} />
                            <TextInput style={styles.form}
                                placeholder={"Contact Number"}
                                maxLength={10}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    this.setState({
                                        ContactNo: text
                                    })
                                }} />
                            
                            <TextInput style={styles.form}
                                placeholder="abc@example.com"
                                keyboardType="email-address"
                                onChangeText={(text) => {
                                    this.setState({
                                        emailId: text
                                    })
                                }} />
                            <TextInput style={styles.form}
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        password: text
                                    })
                                }} />
                            <TextInput style={styles.form}
                                placeholder="Confirm Password"
                                secureTextEntry={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        ConfirmPassword: text
                                    })
                                }} />
                            <View>
                                <TouchableOpacity style={styles.buttonStyle3}
                                    onPress={() => this.signUp(this.state.emailId, this.state.password, this.state.ConfirmPassword)}>
                                    <Text style={styles.buttonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.buttonStyle4}
                                    onPress={() => this.setState({
                                        FormVisible: false
                                    })}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>

            </Modal>
        );
    }


    login = async (emailId, password) => {
        await firebase.auth().signInWithEmailAndPassword(emailId, password)
            .then((response) => {
                this.props.navigation.navigate('Donate');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                return alert(errorMessage)
            })
    }


    signUp = async (emailId, password, ConfirmPassword) => {
        if (password !== ConfirmPassword) {
            return alert("Password Do Not Match")
        } else {
            await firebase.auth().createUserWithEmailAndPassword(emailId, password)
                .then(() => {
                    db.collection('user').add({
                        First_Name : this.state.FirstName,
                        Last_Name : this.state.LastName,
                        Address : this.state.Address,
                        Contact_Number : this.state.ContactNo,
                        School_Name : this.state.School,
                        Email_ID : this.state.emailId
                    })
                    return alert("User Registered Successfully", '', 
                    [
                        {text:'OK', onPress:()=>this.setState({
                            FormVisible:false
                        })}
                    ]);
                    
                })
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMsg = error.message;
                    return alert(errorMsg);
                })
            }
            this.setState({
                FormVisible:false
            })
    }

    
    render() {
        return (
         
                
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }} behavior='padding' enabled>
                <View>
                    <Text style={styles.heading}>Barter System</Text>
                </View>
                <View>
                    {this.form()}
                    <TextInput style={styles.inputStyle}
                        placeholder="abc@example.com"
                        keyboardType="email-address"
                        onChangeText={(text) => {
                            this.setState({
                                emailId: text
                            })
                        }} />
                    <TextInput style={styles.inputStyle2}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            })
                        }} />
                    <TouchableOpacity style={styles.buttonStyle2}
                        onPress={() => {
                            this.login(this.state.emailId, this.state.password)
                        }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonStyle}
                        onPress={() => {
                            this.setState({
                                FormVisible:true
                            })
                        }}><Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
           
        )
    }
}
const styles = StyleSheet.create({
    heading: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 40,
        marginTop: 40,
        paddingEnd: 50,
        fontWeight: 'bold',
        marginLeft: 50,
        color: 'orange',
    },
    inputStyle: {
        borderWidth: 2,
        marginTop: -10,
        margin: 5,
        padding: 5,
        width: 350,
        height: 40,
        backgroundColor:'white'
    },
    inputStyle2: {
        borderWidth: 2,
        margin: 5,
        padding: 5,
        width: 350,
        height: 40
    },
    buttonStyle: {
        backgroundColor: '#4e3620',
        width: 100,
        height: 50,
        marginLeft: 210,
        marginTop: -50,
        borderRadius: 10
    },
    buttonStyle2: {
        backgroundColor: '#4e3620',
        width: 100,
        height: 50,
        marginLeft: 50,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 20
    },
    form:{
        borderWidth: 2,
        marginTop:0,
        margin: 5,
        padding: 5,
        width: 320,
        height: 40,
        backgroundColor:'white'
    },
    buttonStyle3: {
        backgroundColor: '#ce1212',
        width: 100,
        height: 50,
        marginLeft: 50,
        borderRadius: 10
    },buttonStyle4: {
        backgroundColor: '#ce1212',
        width: 100,
        height: 50,
        marginLeft: 180,
        marginTop: -50,
        borderRadius: 10
    },
});
