import React, { useState, useEffect } from 'react';
import { Image, Dimensions,  View, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Text, 
        KeyboardAvoidingView, Platform, Alert, ActivityIndicator, Modal,BackHandler } from 'react-native';
import APIManager from '../Managers/APIManager';

 const {width, height} = Dimensions.get('screen');

const LoginScreen  = ({ navigation }) => {

    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isRegistered, setIsRegistered] = useState(true)
    const [errors, setErrors] = useState({})


  useEffect(() => {
      
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
  }, []);

   const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to exit app?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

  const _onLogin = (type) => {
  if(_validateForm()){
    setIsLoading(true)
    const data ={
      "username" : username,
      "password": password
    }
    APIManager.onLogIn(data, type, (res)=>{
      //alert(JSON.stringify(res))
       setIsLoading(false)
      if(res.data != ""){
        setUsername(null)
        setPassword(null)
       APIManager.setValueForKey("accessToken", res.data)
       navigation.push("HomeScreen")
      }
    }, (err)=>{
      setIsLoading(false)
       Alert.alert("Login Failed", err.message)
     
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

      if (!password) {
        formIsValid = false;
        errors["password"] = "*Please enter Password";
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
            <Text style={{fontSize:20, color:"#3D4D5C", padding:5, fontWeight:"bold"}}>Welcome to Demo App</Text>
           
          {(isRegistered == true)?
            <TouchableOpacity onPress={()=>setIsRegistered(false)} style={{flexDirection:"row"}}>
              <Text style={{fontSize:14, color:"#3D4D5C"}}>New Here? </Text>
              <Text style={{fontSize:14, color:"#1CD7BB"}}>Create an Account</Text>
            </TouchableOpacity>:
             <TouchableOpacity onPress={()=>setIsRegistered(true)} style={{flexDirection:"row"}}>
              <Text style={{fontSize:14, color:"#3D4D5C"}}>Already have an account? </Text>
              <Text style={{fontSize:14, color:"#1CD7BB"}}>Sign In</Text>
            </TouchableOpacity>}
          </View>  

            <View style={styles.inputContainer}>
                <TextInput
                  autoFocus
                  style={styles.input}
                  placeholder="Username"
                  onChangeText={(text) => setUsername(text)}
                />
              <Text style={{fontSize:12, color:"red", padding:5, textAlign:"center"}}>{errors.username}</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={true}
                />
             <Text style={{fontSize:12, color:"red", padding:5, textAlign:"center"}}>{errors.password}</Text>
  
             </View>
 
             </KeyboardAvoidingView>

              {(isRegistered == true)?
             
               <Text onPress={()=>navigation.push("ForgotPassword")} style={{fontSize:14, color:"#1CD7BB"}}>Forgot Password ?</Text>:null}
             
             <View style={{marginTop:height*0.07, width:width, alignItems:"center"}}>
               {(isRegistered == true)?
                <TouchableOpacity activeOpacity={.5} style={styles.btnStyle} onPress={()=> _onLogin("sign-in")}> 
                   <Text style={styles.btnText}>SIGN IN</Text>
                </TouchableOpacity>:
                <TouchableOpacity activeOpacity={.5} style={styles.btnStyle} onPress={()=> _onLogin("sign-up")}> 
                   <Text style={styles.btnText}>SIGN UP</Text>
                </TouchableOpacity>}
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

export default LoginScreen;
