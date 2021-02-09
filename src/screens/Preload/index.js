
import React,{ useEffect, useContext } from 'react'
import {
View, Image, Alert
} from 'react-native';
import styles from './styles';
import {server, showError, showSuccess} from '../../commons'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../../contexts/UserContext'
import { useNavigation } from '@react-navigation/native'

export default function App() {
  const { dispatch:userDispatch } = useContext(UserContext)
  const logo_end = '../../assets/abertura.png'
  const navigation = useNavigation();
  
  const get_token = async () =>{
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    if (token!=null || token!='' ){   
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      await axios.post(`${server}/auth/check_token`,       
      ).then(async function (response) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        await AsyncStorage.setItem('token',response.data.token)
        userDispatch({
          type: 'setUser',
          payload:{
              id: response.data.id
          }
      })
      navigation.reset({
                      routes:[{name:'Demandas'}]
                  })
      }).catch(function (error){
        navigation.reset({
          routes:[{name:'Login'}]
      })
        


      })
      
    }else{
      navigation.reset({
        routes:[{name:'Login'}]
    })
    }
  }

  useEffect(() => {
    get_token()
  }, []);




  return (
            <View style={styles.container}>
                <Image
                    style={styles.tinyLogo}
                    source={require(logo_end)}
                 />

            </View>
      )
}

