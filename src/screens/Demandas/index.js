import React, { useState, useEffect} from 'react'
import { Text,
   View,
   SafeAreaView,
   Alert,
   ActivityIndicator,
   TouchableOpacity,
     } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Demanda from '../../components/demanda'
import Header from '../../components/header'
import EditaDemanda from '../../components/editaDemanda'
import {server, showError, showSuccess} from '../../commons'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import AdicionarTask from '../AdicionarTask'
import styles from './styles'
import { List, ListItem, SearchBar } from "react-native-elements";
import demanda from '../../components/demanda';
//import VegaScrollList from 'react-native-vega-scroll-list';



export default props =>{

const [isLoading, setLoading] = useState(false);
const [dados_demandas, setDados_demandas] = useState([]);
const [addTaskVisible, setAddTaskVisible] = useState(false);
const [refreshing, setRefreshing] = useState(false)
const [fullData, setFullData] = useState([]);
const [query, setQuery] = useState('')
const [editVisible, setEditVisible] = useState(false)
const[demandaEdit, setDemandaEdit] = useState({id:'', data_previsao:'', descricao:'' })


const handleEdit = (demanda)=>{
  setDemandaEdit({id:demanda.id, data_previsao:demanda.data_previsao, descricao:demanda.descricao })
  setEditVisible(true)
  
}


const handleSearch = (text) => {
  const formattedQuery = text.toLowerCase();
  const filteredData = fullData.filter((item)=> item.descricao.includes(query)) 
  setDados_demandas(filteredData);
  setQuery(text);
};


const renderHeader = () => {
  return <SearchBar placeholder="buscar..." lightTheme round
  value={query}
  onChangeText={query => handleSearch(query)}
  />;
};
const renderFooter = () => {
  if (!isLoading) return null;

  return (
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
      }}
    >
        
    </View>
  );
};
const handleLoadMore = () => {
  //getList()
}

useEffect(() => {
  setLoading(true)
  getList()

}, []);

const handleRefresh = () => {
      setRefreshing(true)
      //getList()

    
}
const editDemanda= async (demanda)=>{

  await axios.post(`${server}/tasks/edit`, 
      {
        id:demanda.id,
        descricao: demanda.descricao,
        estimateAt: demanda.estimateAt,
        doneAt: null,
      }      

      ).then(({ data })=>{
    Alert.alert("Sucesso", "Editado com sucesso")
     getList()     

    }).catch(function (error){
      Alert.alert('Ops!', `Não foi possível adicianar a demanda:   ${error}`)      

    }).finally(()=>setEditVisible(false))

}


const addDemanda = async (demanda)=>{
  try{
    setLoading(true)
    
    await axios.post(`${server}/tasks/add`, 
      {
        descricao: demanda.descricao,
        estimateAt: demanda.estimateAt,
        doneAt: null,
      }      
    ).then(({ data })=>{
     
     getList()     
    }).catch(function (error){
      Alert.alert('Ops!', `Não foi possível adicianar a demanda:   ${error}`)      
    }).finally(()=>setLoading(false))
  } catch(e){
    showError(e) 
}}
  function loading() {
    setLoading(true);
  }

const delDemanda = async (id_demanda)=>{
  try{
    
    await axios.post(`${server}/tasks/delete`, 
      {
        id:id_demanda
      }      
    ).then(({ data })=>{
     
     getList()     
    }).catch(function (error){
      Alert.alert('Ops!', `Não foi possível deletar :   ${error}`)      
    }).finally(()=>setLoading(false))
  } catch(e){
    showError(e) 
}}


const getList= async () =>{
  try{
      
      await axios.get(`${server}/tasks/list`, 
        {
          /*"email":usuario.email, para efeito de logs se necessario*/
        }      
      ).then(({ data })=>{
        console.log("data", data)
        setDados_demandas(data)
        setFullData(data)   
        setRefreshing(false)
      }).catch(function (error){
        Alert.alert('Ops!', `Problema na lista de Demandas  ${error}`)      
      }).finally(()=>setLoading(false))

    } catch(e){
      showError(e) 
}}

  return (
           
            <SafeAreaView style={{backgroundColor:'#FFF'}}>
              <View style={styles.container}>

                   <Header title="Demandas" />

                              
                    <FlatList
                    distanceBetweenItem={20}
                    contentContainerStyle={{ paddingBottom: 200 }}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={renderFooter}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={50}
                    data={dados_demandas}
                    refreshing={false}
                    onRefresh={handleRefresh}
                    keyExtractor = {item => `${item.id}`}
                    renderItem= {({ item, index })=>{
                                                return( 
                                                  < Demanda  id = {item.id} descricao = {item.descricao} data_previsao={item.estimateAt} data_conclusao ={item.doneAt} delete={delDemanda} load = {loading} edit={handleEdit} index ={index}/>
                                                ) 
                                              }}
                        />
                
                                              
                    <View style={styles.containerAdd}>
                          <AdicionarTask
                            isVisible={addTaskVisible}
                            save={addDemanda}
                            onCancel={() => {
                              setLoading(false)
                              setAddTaskVisible(false)
                            }}
                          />
                    </View>
                    <View style={styles.containerAdd}>
                          <EditaDemanda
                          data_previsao = {demandaEdit['data_previsao']}
                          descricao = {demandaEdit['descricao']}
                          editDescricao = {setDemandaEdit}
                          id = {demandaEdit['id']}
                          isVisible={editVisible}
                          edit={editDemanda}
                          onCancel={() => {
                            setLoading(false)
                            setEditVisible(false)
                          }}
                          />
                      </View>
                             
                  <TouchableOpacity
                      style={styles.addButton}
                      activeOpacity={0.7}
                      onPress={() => {
                        setAddTaskVisible(true)
                      }}>
                      <Icon name="plus" size={20} color='white' />
                  </TouchableOpacity>
                  {
                    isLoading ? <ActivityIndicator animating size="large" color='#FD9801' style={styles.activity}/> :null
                  }
                  
                </View>      
             </SafeAreaView>     
           )
}
