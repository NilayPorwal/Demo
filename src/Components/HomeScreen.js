import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Dimensions, View, Text, TouchableOpacity, Alert, FlatList, BackHandler, Modal, ActivityIndicator } from 'react-native';
import APIManager from './../Managers/APIManager';
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
var dateFormat = require('dateformat');


const {width, height} = Dimensions.get('screen');

const HomeScreen  = ({ navigation }) =>  {


  const [isLoading, setIsLoading] = useState(true)
  const [postList, setPostList] = useState([]);


  useEffect(() => {
      
       _getFeed();

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

  const _getFeed = () => {   
    APIManager.getFeed((res)=>{
          setIsLoading(false)
          setPostList([])
          setPostList(res.data.reverse())
          //alert(JSON.stringify(res))
    }, (err)=>{
          setIsLoading(false)
        Alert.alert("Failed to fetch Feed", err.message)    
     })
  }

  const _onReaction = (item, type, index) => {
        setIsLoading(true)
    const data = {
          "feedId": item.id,
          "like": (type == 0)?false:true,
          "love": false
        }

    APIManager.onReaction(data,(res)=>{
        setIsLoading(false)
       //alert(JSON.stringify(res))
        let posts = postList
        posts[index]["activeUserLikedIt"] = type
        setPostList([...posts])

       //_getFeed()
    }, (err)=>{
          setIsLoading(false)
       Alert.alert("Failed to React", err.message)
     
     })
  }

  const _logOut = () =>{
      Alert.alert("Hold on!", "Are you sure you want to Log Out?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => {APIManager.removeValueForKey(),
                                      navigation.push("LoginScreen")}}
      ]);
      return true;
    };


   const _renderData = ({ item, index }) =>{
    return (
      <View style={{height:height*0.3, backgroundColor:"#fff", elevation:5, margin:5}}>
       <View style={{height:"25%", flexDirection:"row", justifyContent:"space-between", padding:5}}> 
        <Text style={{color:"#000", fontSize:12}}>{item.author.username}</Text>
        <Text style={{color:"#000", fontSize:12}}>{dateFormat(item.createdAt, "mmmm dS, yyyy, h:MM:ss TT")}</Text>
       </View>
       <View style={{height:"50%", alignItems:"center", justifyContent:"center"}}>
        <Text style={{color:"#000", fontSize:18, fontWeight:"bold", textAlign:"center"}}>{item.content}</Text>
       </View>
       <View style={styles.thumbContainer}>
        {(item.activeUserLikedIt == 1)?
         <Icon onPress={()=>_onReaction(item, 0, index)} name="thumbs-up" size={25} color="#900" />:
         <Icon onPress={()=>_onReaction(item, 1, index)} name="thumbs-up" size={25} color="#d3d3d3" />
        }
       </View>
      </View>
     )
   }

    return (
      <View  style={styles.container}>
         <View style={{height:50, backgroundColor:"#1CD7BB", alignItems:"center", justifyContent:"center"}}>
          <Text style={{color:"#fff", fontSize:18, fontWeight:"bold"}}>Feed</Text>
            <TouchableOpacity onPress={()=> _logOut()} style={styles.logOutBtn}>
             <SimpleLineIcons name="logout" size={20} color="#900" />
            </TouchableOpacity> 
         </View>

         <FlatList
              style={{}}
              data={postList}
              renderItem={(item, index)=>_renderData(item, index)}
              keyExtractor={(item, index) => (item, index)}
            />
                
         <TouchableOpacity onPress={()=> navigation.push("UploadPostScreen", {onGoBack: () => _getFeed()})} 
                           style={styles.fabBtn}>
            <Icon name="plus" size={20} color="#fff" />
        </TouchableOpacity> 

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
  fabBtn:{
    height:50, width:50, borderRadius:25, elevation:5, position:"absolute",  bottom:15, right:15, backgroundColor:"#1CD7BB", alignItems:"center", justifyContent:"center"
  },
  logOutBtn:{
    position:"absolute",  top:15, right:15, 
  },
  thumbContainer:{
    height:"25%", alignItems:"center", justifyContent:"center", borderTopWidth:1, borderTopColor:"#d3d3d3"
  },
   modal: {
    flex: 1,  justifyContent: 'center', alignItems: 'center',backgroundColor:'#00000080'
  },
  modalView:{
   width: '85%',backgroundColor:'#ffffff', padding:10
  }

})
export default HomeScreen;