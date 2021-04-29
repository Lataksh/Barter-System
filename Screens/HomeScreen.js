import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Modal, ScrollView, FlatList } from 'react-native';
import db from '../db.js'
import firebase from 'firebase';
import HeaderComponent from '../Component/Header.js'
import { ListItem } from 'react-native-elements';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            requestList: []
        }
        this.requestRef = null
    }

    requestListGenerator = () => {
        this.requestRef = db.collection('Exchange_Requests').onSnapshot((snapshot) => {
            var listListener = snapshot.docs.map(document => document.data())
            this.setState({
                requestList: listListener
            })
        })
    }
    componentDidMount() {
        this.requestListGenerator();
    }

    componentWillUnmount() {
        this.requestRef();
    }
    
    renderItem = ({ item, i }) => {
        return (
            <ListItem
                key={i}
                title={item.Item_Name}
                subtitle={item.reason}
                rightElement={
                    <TouchableOpacity onPress = {()=>{
                        this.props.navigation.navigate("Details", {'details' : item})
                    }}>
                        <Text>Exchange</Text>
                    </TouchableOpacity>
                }
                bottomDivider
            />
        )
    }

    keyExtractor = (item, index) => index.toString()


    render() {
        return (
            <View>
                <HeaderComponent title="Home Screen" />
                <View>
                    {this.state.requestList.length === 0
                        ? (
                            <View>
                                <Text style = {{fontSize : 50, color : 'black', fontWeight:'bold', textAlign:'center'}}>
                                    No Requests Are Made Till Now!!!
                            </Text>
                            </View>
                        )
                        : (
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.requestList}
                                renderItem={this.renderItem}
                            />
                        )}
                </View>
            </View>
        )
    }
}



 