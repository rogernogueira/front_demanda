import React, {useRef } from "react"
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import styles from './styles'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome'



const Container = styled.TouchableOpacity`
align-items: center;
justify-content: center;
` 


const ViewDescricao = styled.View`

`
const ViewPrvisao = styled.View`
flex-direction: row;
padding: 2px;
`
const ViewConclusao = styled.View`
flex-direction: row;
padding: 2px;
`
const ViewData = styled.View`
background: #0097C8;
border: 1px;
border-radius: 20px;
borderColor:#FFF;
padding: 2px;
flex-direction: row;
align-items: center;
justify-content: center;
width: 110px;
`

export default props =>{
    
    const getRightContent = ()=>{
        
        return (
            <TouchableOpacity style={styles.right}
            onPress={()=>{props.load()
                props.edit({id:props.id, descricao:props.descricao, data_previsao:props.data_previsao})} }
           >
                <Icon name='edit' size={30} color='#06ABD4'/>
            </TouchableOpacity>
        )   
    }
    const getLeftContent = ()=>{
        return (
                <View style={styles.left}>
                    <Icon name='trash' size={20} color='#F44336' style={styles.excludeIcon}/>
                    <Text styles={styles.excludeText}> Excluir </Text>
                </View>
    
        )   
    }
    const DataConclusao =()=>{
        return(
            <ViewData>
            <Text style={styles.TextData}> {props['data_conclusao']} </Text>
            </ViewData>
        )
    }
    const StatusDemanda = ()=>{
        return(
            <ViewData>
                <Text style={styles.TextData}> Em Andamento </Text> 
            </ViewData>
        )
    }
    
    return (
        <>
        <Swipeable  
        renderRightActions={getRightContent}
        renderLeftActions={getLeftContent} 
        onSwipeableLeftOpen = {()=>{
            props.load()
            props.delete(props['id'])}}>
        <Container >
            <View
            elevation={5}
            style={styles.Container} >
            <ViewDescricao>
                  <Text style={styles.TextDescricao}> {props['descricao']} </Text>
            </ViewDescricao>
            <ViewPrvisao>
                <Text style={styles.Text}> Previsão:    </Text>
                <ViewData>
                <Text style={styles.TextData}>{props['data_previsao']} </Text>
                </ViewData>
            </ViewPrvisao>

            <ViewConclusao>
            <Text style={styles.Text}> Conclusão: </Text>
                    { props['data_conclusao']? DataConclusao() :  StatusDemanda()
                    }
            </ViewConclusao>
            </View>
        </Container>
        </Swipeable>
        
        </>
           )
}


