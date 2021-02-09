import React, {Component} from 'react';
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
import commonStyle from '../commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const initialState = {desc: '', date: new Date(), showDatePicker: false};

export default class AdicionarTask extends Component {
  state = {
    ...initialState,
  };
  getDatePiker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.date}
        mode="date"
        onChange={(_, date) => this.setState({date, showDatePicker: false})}
      />
    );
    const dateString = moment(this.state.date).format(
      'ddd, D [de] MMMM [de] YYYY',
    );
    if (Platform.OS === 'android') {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() => this.setState({showDatePicker: true})}>
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker ? datePicker:null}
        </View>
      );
    }
    return datePicker;
  };
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide">
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        <View style={styles.conteiner}>
          <Text style={styles.header}>Nova Demanda </Text>
          <TextInput
            style={styles.textIn}
            placeholder="Informe a descrição.."
            value={this.state.desc}
            onChangeText={(desc) => this.setState({desc})}
            //value = {this.state.desc}
          />
          {this.getDatePiker()}
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                date_format = moment(this.state.date).format('L')
                this.props.save({
                  descricao: this.state.desc,
                  estimateAt: date_format,
                });
                
                this.setState({...initialState});
                this.props.onCancel();
              }}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    fontFamily: commonStyle.fontFamily,
    backgroundColor: commonStyle.colors.today,
    color: commonStyle.colors.secundary,
    textAlign: 'center',
    padding: 15,
    fontSize: 18,
  },
  conteiner: {
    flex: 1,
    backgroundColor: 'white',
  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyle.colors.today,
  },
  textIn: {
    fontFamily: commonStyle.fontFamily,
    width: '90%',
    height: 40,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderRadius: 6,
  },
  date: {
    fontFamily: commonStyle.fontFamily,
    fontSize: 18,
    marginLeft: 15,
  },
});
