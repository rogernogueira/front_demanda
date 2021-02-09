import React from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback, Alert, TouchableOpacity } from 'react-native';
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import styles from './styles.js'

export default props =>{
    const date = moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')
    const doneOrNotStyle = props.doneAt!= null ?
    {textDecorationLine: 'line-through'}:{}
   
    const getRightContent = ()=>{
        return (
            <TouchableOpacity style={styles.right}
            onPress={()=> props.delete(props.id)}
           >
                <Icon name='trash' size={30} color='white'/>
            </TouchableOpacity>
        )   
    }
    const getLeftContent = ()=>{
        return (
                <View style={styles.left}>
                    <Icon name='trash' size={20} color='#FFF' style={styles.excludeIcon}/>
                    <Text styles={styles.excludeText}> Excluir </Text>
                </View>

        )   
    }
    return (
        <Swipeable 
            renderRightActions={getRightContent}
            renderLeftActions={getLeftContent} 
            onSwipeableLeftOpen = {()=> props.delete(props.id)} 
             >
                <View style={styles.container}>
                    <TouchableWithoutFeedback
                        onPress={()=> props.toggleTask(props.id)}

                    >
                        <View style={styles.checkContainer}>
                            {getCheckView(props.doneAt)}
                        </View>                  
                        
                    </TouchableWithoutFeedback>
                    
                    <View>
                    <Text style={[styles.desc, doneOrNotStyle]}> {props.desc} </Text>
                    <Text style={[styles.date]}> {date +""} </Text>
                    </View>           
                </View>
            </Swipeable>
           )
}

function getCheckView(doneAt){
    if (doneAt != null){
        return( <View style={styles.done}>
                  <Icon name='check' size={20} color='#FFF'></Icon>
                </View>)
    }else{
        return( <View style={styles.pending}></View>)
   }
}
