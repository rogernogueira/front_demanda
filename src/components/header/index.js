import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';

const Container = styled.View`
flex-direction: row
marginBottom:1px;

`
export default props =>{
     const navigation = useNavigation()
     const logout = async ()=>{
          await AsyncStorage.setItem('token','')
          navigation.reset({
               routes:[{name:'Preload'}]
           })
     }

    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');
    return (
        <Container>
           <LinearGradient
           start={{x: 0, y: 0}} end={{x: 1, y: 0}}
           colors={['#00132B','#013B69','#a1becd', ]} 
           style={styles.linearGradient}
          
           >
                <Text style={styles.TextHeader}>
                      {props.title}
                </Text>
                <Text style={styles.TextData}>
                    {today}
                </Text>
                <TouchableOpacity 
                onPress = {logout}
                style={styles.icon_logout} >
                    <Icon name='sign-out' size={20} color='#FD9801' />
                 </TouchableOpacity>

           </LinearGradient> 
           </Container>
           )
}

