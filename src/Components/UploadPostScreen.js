import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Dimensions, AsyncStorage, View, Text, TouchableOpacity, Alert, TextInput, BackHandler, Modal, ActivityIndicator } from 'react-native';
import APIManager from './../Managers/APIManager';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

 const {width, height} = Dimensions.get('screen');

 const UploadPostScreen  = ({ navigation }) => {

  const route = useRoute();

  const [isLoading, setIsLoading] = useState(false)
  const [post, setPost] = useState(null);

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

 const _uploadPost = () => {
  if(post != null && post.trim() != ""){
    setIsLoading(true)
    const data = {
        "content": post
      }
    APIManager.uploadPost(data,(res)=>{
       setIsLoading(false)
       //alert(JSON.stringify(res))
        route.params.onGoBack();
        navigation.goBack();
        return true;
    }, (err)=>{
          setIsLoading(false)
         Alert.alert("Failed to Post", err.message)
     
     })
   }
  }


    return (
      <View  style={styles.container}>
         <View style={{height:50, backgroundColor:"#1CD7BB", alignItems:"center", justifyContent:"center"}}>
          <Text style={{color:"#fff", fontSize:18, fontWeight:"bold"}}>Post</Text>
         </View>
         <TextInput
                autoFocus
                style={styles.input}
                placeholder="Type Something.."
                onChangeText={(text) => setPost(text)}
                multiline
                numberOfLines={4}
              />

            <View style={{marginTop:20, width:width, alignItems:"center"}}>
              <TouchableOpacity activeOpacity={.5} style={styles.btnStyle} onPress={_uploadPost}> 
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
    flex: 1,  backgroundColor:"#f8f7fc"
  },
  input:{
   margin:10, backgroundColor:'#ffffff', padding:10, borderColor:"#3D4D5C", borderWidth:0.2
  },
  btnStyle:{
    width:"80%",  elevation:5, borderRadius:5, alignItems:'center', paddingVertical:12, backgroundColor:"#1CD7BB"
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

export default UploadPostScreen;