import {StyleSheet} from 'react-native'
import commonStyle from '../../commonStyles'

export default  styles = StyleSheet.create({
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
  