import React, { useState, useEffect } from 'react';
import { Image, Dimensions, View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Text, 
        KeyboardAvoidingView, Platform, Alert, ActivityIndicator, Modal, BackHandler} from 'react-native';
import APIManager from '../Managers/APIManager';

 const {width, height} = Dimensions.get('screen');

const ForgotPassword  = ({ navigation }) => {

    const [username, setUsername] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})

 useEffect(() => {
      
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
  }, []);

 const backAction = () => {
        navigation.goBack();
        return true;
    };

  const _getPassword = (type) => {
  if(_validateForm()){
    setIsLoading(true)
    APIManager.getPassword(username, (res)=>{
       setIsLoading(false)
       //alert(JSON.stringify(res))
       Alert.alert("Your Password Is", res.data.password)
    }, (err)=>{
      setIsLoading(false)
       Alert.alert("Failed to get Password", err.message)
     
     })

    }
  }

  const _validateForm = () =>{

      let errors = {};
      let formIsValid = true;
        
      if (!username) {
        formIsValid = false;
        errors["username"] = "*Please enter Username.";
      }


    setErrors(errors)
    return formIsValid;

 }

    return (
    <View style={styles.container}>  
      <KeyboardAvoidingView
        behavior='position'
        keyboardVerticalOffset={(Platform.OS === 'ios') ? 40 : 20}
      >
           <View style={styles.imgView}>
              <Image 
                source={require('../Resources/app_logo.png')}
                style={{width:width*0.5, height:height*0.35}}
                resizeMode="contain"
              />

          </View>
          <View style={{alignItems:"center"}}>
            <Text style={{fontSize:20, color:"#3D4D5C", padding:5, fontWeight:"bold"}}>Enter Your Username</Text>

            <View style={styles.inputContainer}>
                <TextInput
                  autoFocus
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={(text) => setUsername(text)}
                />
              <Text style={{fontSize:12, color:"red", padding:5, textAlign:"center"}}>{errors.username}</Text>
  
             </View>
           </View>  
 
             </KeyboardAvoidingView>
             
             <View style={{marginTop:height*0.07, width:width, alignItems:"center"}}>
                <TouchableOpacity activeOpacity={.5} style={styles.btnStyle} onPress={()=> _getPassword("sign-up")}> 
                   <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
             </View>   
            
          <Modal
            transparent = {true}
            visible = {isLoading}
          >
         
              <View  style = {styles.modal}>
                <View style={{...styles.modalView, flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                  <Text style={{color:'#000', fontSize:15, fontFamily: "Lato-Semibold"}}>Please Wait..</Text>
                  <ActivityIndicator size="small" color="#000000" />                    
                </View>
              </View>
          </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, alignItems: "center", backgroundColor:"#f8f7fc"
  },

  imgView:{
   alignItems:'center',
  },
  inputContainer:{
   marginTop:height*0.05
  },
  input:{
   width:width*0.8,  borderRadius:5, backgroundColor:'#ffffff', paddingVertical:10, paddingHorizontal:20, borderColor:"#3D4D5C", borderWidth:0.2
  },
  linearGradient:{
    elevation:8, width:width*0.75, borderRadius:20, marginTop:5
  },
  btnStyle:{
    width:"80%",  elevation:8, borderRadius:5, alignItems:'center', paddingVertical:12, backgroundColor:"#1CD7BB"
  },
  btnText:{
    color:'#FFFFFF', fontFamily:'GoogleSans-Medium', fontSize:15
  },
  modal: {
    flex: 1,  justifyContent: 'center', alignItems: 'center',backgroundColor:'#00000080'
  },
  modalView:{
   width: '85%',backgroundColor:'#ffffff', padding:10
  }

})

export default ForgotPassword;
