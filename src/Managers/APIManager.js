import { AsyncStorage, Platform, } from 'react-native';
import Storage from 'react-native-storage';
import axios from 'axios';


  const storage = new Storage({
    storageBackend: AsyncStorage, 
    enableCache: true,
    sync: {

    }
  });

export default class APIManager {  

  
     static host = 'https://segware-book-api.segware.io/api/'
 /**
     * Get value for key
     */
    static getValueForKey(key, success, failure){
        try{    
           storage.load({
              key: key,
              autoSync: true,
              syncInBackground: true,
            })
            .then(data => {
              success(data) 
            })
            .catch(err => {
              failure(err) 
              console.log(err.message);
             
             });
          }
          catch (error){
              failure(err) 
              console.log("APIManager - Unable to retrieve value for key " + key +". ", JSON.stringify(error));
          }
      }
  
    
    static setValueForKey(key, value){
          try{    
              storage.save({
                key: key, // Note: Do not use underscore("_") in key!
                data: value
              });
         
          }
          catch (error){
              console.log("APIManager - Unable to set value for key " + key +". ", JSON.stringify(error));
          }
      }
  
    static removeValueForKey(){
          try{    
             
             storage.remove({
                  key: 'accessToken'
                }); 
          }   
          catch (error){
              console.log("APIManager - Unable to remove value for key. ", JSON.stringify(error));
          }
      }

  
  static onLogIn(data,type, success, failure) {
    
        axios.post(APIManager.host+type, JSON.stringify(data), {
           headers: {  
           'Content-Type': 'application/json',  
          }
        })  
          .then((responseJson)=> {
             try {
               success(responseJson);
             } catch (error) {
               failure(error);
             }      
           })  
           .catch((error)=> {
             failure(error);
           });
     }

    static getPassword(username, success, failure) {
    
        axios.get(APIManager.host+"forgot-password/"+username,  {
           headers: {  
            'Content-Type': 'application/json',
          }
        })  
          .then((responseJson)=> {
             try {
               success(responseJson);
             } catch (error) {
               failure(error);
             }      
           })  
           .catch((error)=> {
             failure(error);
           });
     }



    static getFeed(success, failure) {

       APIManager.getValueForKey('accessToken', (token)=>{
        console.log(token)
        axios.get(APIManager.host+"feeds",  {
           headers: {  
            'Content-Type': 'application/json',
            "Authorization": "Bearer "+ token
          }
        })  
        .then((responseJson)=> {
             try {
               success(responseJson);
             } catch (error) {
               failure(error);
             }      
           })  
           .catch((error)=> {
             failure(error);
           });
         }, (error)=>{
          console.log('error', error)
        })
     }

    static uploadPost(data, success, failure) {
      APIManager.getValueForKey('accessToken', (token)=>{
        axios.post(APIManager.host+"feed", JSON.stringify(data), {
           headers: {  
           'Content-Type': 'application/json',
           "Authorization": "Bearer "+ token
          }
        })  
        .then((responseJson)=> {
             try {
               success(responseJson);
             } catch (error) {
               failure(error);
             }      
           })  
           .catch((error)=> {
             failure(error);
           });
       }, (error)=>{
          console.log('error', error)
        })
     } 

     static onReaction(data, success, failure) {
       APIManager.getValueForKey('accessToken', (token)=>{
        axios.post(APIManager.host+"reaction", JSON.stringify(data), {
           headers: {  
           'Content-Type': 'application/json',
           "Authorization": "Bearer "+ token 
          }
        })  
        .then((responseJson)=> {
             try {
               success(responseJson);
             } catch (error) {
               failure(error);
             }      
           })  
           .catch((error)=> {
             failure(error);
           });
        }, (error)=>{
          console.log('error', error)
        })   
     }       


}
