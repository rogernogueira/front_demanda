import {Alert, Platform} from 'react-native'

const server = Platform.OS==='ios'
    ? 'http://localhost:5000': 'http://192.168.0.105:5000'

function showError(err){
    Alert.alert('Ops! Ocorreu um erro', `Mensage : ${err}`)
}
function showSuccess(msg){
    Alert.alert('Sucesso!', msg)
}
export {server, showError, showSuccess}