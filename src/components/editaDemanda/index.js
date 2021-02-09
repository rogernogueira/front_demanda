import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Image,
  Platform,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import styles from './styles'
const initialState = {desc: '', date: new Date(), showDatePicker: false};


export default props => {
    const [date, setDate] = useState(new Date())
    const [descricao, setDescricao] = useState(props.descricao)
    const [id, setId] = useState(props.id)
    const[showDatePicker, setShowDatePicker] = useState(false)
    const format_data = moment(date,'DD-MM-YYYY' )
 
  const getDatePiker = () => {
  
    let datePicker = (
      <DateTimePicker
        value={date}
        mode="date"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || date;
          setDate(currentDate)
          setShowDatePicker(false)
        
        }
        }

      />
    );
    const dateString = moment(date).format(
      'ddd, D [de] MMMM [de] YYYY',
    );
    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {showDatePicker ? datePicker:null}
        </View>
      )
    }
    return datePicker;
  }
  return(
      <Modal
        transparent={true}
        visible={props.isVisible}
        onRequestClose={props.onCancel}
        animationType="slide">
        <TouchableWithoutFeedback onPress={props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        <View style={styles.conteiner}>
          <Text style={styles.header}>Editar Demanda </Text>
          <TextInput
            style={styles.textIn}
            placeholder="Informe a descrição.."
            value={props.descricao}
            onChangeText={(text) => props.editDescricao({id:props.id, data_previsao:date, descricao:text })}
            //value = {this.state.desc}
          />
          {getDatePiker()}
          <View style={styles.buttons}>
            <TouchableOpacity onPress={props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                date_format = moment(date).format('L')
                props.edit({
                  id: props.id,  
                  descricao: props.descricao,
                  estimateAt: date_format,
                });
                
                
                props.onCancel();
              }}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }

