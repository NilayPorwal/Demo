import React, { Component } from 'react';
import { Image, Dimensions, AsyncStorage, View } from 'react-native';
import APIManager from './../Managers/APIManager';

export const {width, height} = Dimensions.get('screen');


export default class SplashScreen extends Component {

  constructor(props) {
    super(props);
    global.SplashScreen = this;
    this.state = {
      
    };

  }

  componentDidMount() {
    this.loadData()
  }



  loadData() {
    setTimeout(() => {
      APIManager.getValueForKey('accessToken', (data) => {
        if (data) {
          this.props.navigation.push("HomeScreen")
        }
        else {
          this.props.navigation.push("LoginScreen")
        }

      }, (error) => {
        this.props.navigation.push("LoginScreen")
      })
    }, 1500)

  }


  render() {
    return (
      <View style={{ flex: 1, alignItems:"center", justifyContent:"center", backgroundColor:"#f8f7fc" }}>
              <Image 
                source={require('../Resources/app_logo.png')}
                style={{width:width*0.5, height:height*0.15}}
                resizeMode="contain"
              />
      </View>
    );
  }
}
