import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Modal, ScrollView } from 'react-native';
import db from '../db.js'
import firebase from 'firebase';
import HeaderComponent from '../Component/Header.js'
import Card from 'react-native-elements';

export default class ReceiverDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            receiverID: this.props.navigation.getParam('details')["UserID"],
            senderID: firebase.auth().currentUser.email,
            requestId: this.props.navigation.getParam('details')["UniqueID"],
            BookName: this.props.navigation.getParam('details')["BookName"],
            Reason: this.props.navigation.getParam('details')["Reason"],
            RequesterName: '',
            RequesterContact: '',
            RequesterAddress: '',
            RequesterDocId: ''
        }
    }

    requesterDetails = () => {
        db.collection('user').where("Email_ID", "==", this.state.receiverID).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    this.setState({
                        RequesterName: doc.data().First_Name,
                        RequesterContact: doc.data().Contact_Number,
                        RequesterAddress: doc.data().Address,
                    })
                })
            })
    }

    updateBookStatus = () => {
        db.collection('BookDonations').add({
            'BookName': this.state.BookName,
            'RequestId': this.state.requestId,
            'Requested_By': this.state.RequesterName,
            'Donor_Name': this.state.senderID,
            'requestStatus': "Donor Intrested in donating the book"
        })
    }

    render() {
        return (
            <View>
                {
                this.state.receiverID !== this.state.senderID ?(
                <TouchableOpacity onPress={() => {
                    this.updateBookStatus();
                    this.props.navigation.navigate('donations')
                }}>
                    <Text>
                        I want to Donate
                    </Text>
                </TouchableOpacity>
                )
                :
                alert("You cant donate the book to yourself")
                }
            </View>
        )
    }
}