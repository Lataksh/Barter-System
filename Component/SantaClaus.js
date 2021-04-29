import React from 'react';
import LottieView from 'lottie-react-native'

export default class SantaClaus extends React.Component{
    render(){
        return(
            <LottieView
            source={require('../assets/43385-papa-noel-santa-claus-animation.json')} style = {{width:450, height:450, alignContent:'center', alignItems:'center', alignSelf:'center'}}
            autoPlay loop/>
            
        );
    }
}