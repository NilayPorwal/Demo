import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

/** Screens */
import SplashScreen from '../Components/SplashScreen'
import LoginScreen from '../Components/LoginScreen'
import ForgotPassword from '../Components/ForgotPassword'

import HomeScreen from '../Components/HomeScreen'
import UploadPostScreen from '../Components/UploadPostScreen'



const Stack = createStackNavigator();

export default class Navigation extends Component {

  createHomeStack = () => 
    <Stack.Navigator >
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="UploadPostScreen" component={UploadPostScreen} options={{headerShown: false}} />
    </Stack.Navigator>

  render(){
    return (
      <NavigationContainer>
          {this.createHomeStack()}
        </NavigationContainer>
    )
  }
}