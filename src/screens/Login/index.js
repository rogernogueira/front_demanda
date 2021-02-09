/* eslint-disable semi */
import React, {useState, useEffect, useContext} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
  Alert,
} from 'react-native';
import styles from './styles';
import {server, showError, showSuccess} from '../../commons'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';
import {UserContext} from '../../contexts/UserContext'



export default function App() {
  
  const { dispatch:userDispatch } = useContext(UserContext)

  const [usuario, setUser] = useState({
    email: '',
    password: '',
  })
  
  const navigation =useNavigation()
  

  const[dados_registro, setRegistro] = useState({
    nome: '',
    comfirmPassword: '',
  })
  const[viewRegister, setViewRegister] = useState(false)
  

  const [offset] = useState(new Animated.ValueXY({x: 0, y: 80}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 270, y: 97}));

  const [isValid, setValid] = useState()

  const validation =[]

  validation.push(usuario.email && usuario.email.includes('@'))
  validation.push(usuario.password && usuario.password.length>=6)
  const valida= (validation.reduce((t,a)=>t && a))


  const btn_sair_registra = () =>{
      if (viewRegister) {
        setUser({email: '', password: ''})
        setViewRegister(false)
        setRegistro({nome: '',comfirmPassword: ''})
      } else {
        setViewRegister(true)
      }
  }
  
  const btn_salvar_acessar = () =>{
    if (viewRegister) {
      signup()
      setRegistro({nome: '',comfirmPassword: ''})
    } else {
      login_get_token()
    } 
}
  login_get_token = async () =>{
        try{
          await axios.post(`${server}/auth/login`, 
            {
              "email":usuario.email,
              "password":usuario.password, 
            }      
          ).then(async function (response) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            await AsyncStorage.setItem('token',response.data.token)
            console.log(response)  
            userDispatch({
              type: 'setUser',
              payload:{
                  id: response.data.id
              }
            })
            navigation.navigate('Demandas')
            
          }).catch(function (error){
            Alert.alert('Ops!', `Usuário ou Login incorreto:  ${error}`)      
          })
          

        } catch(e){
          showError(e) 
  }}

  signup = async() =>{
    
    
    if  (dados_registro.comfirmPassword === usuario.password){
      try{
        await axios.post(`${server}/auth/register`, 
          {
            "name": dados_registro.nome,
            "email":usuario.email,
            "password":usuario.password, 
          }      
        )
        showSuccess("Usuário cadastrado")
        setViewRegister(false)
      } catch(e){
        showError(e)
      }
    } else{

      Alert.alert('Ops!', 'As senha não coinciden')
    }
  }


  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      keyboardDidShow,
    );

    keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      keyboardDidHide,
    );

    // Animações em paralelo
    Animated.parallel([
      // Fornece um modelo de física básico (efeito mola/estilingue)
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: false,
      }),

      // Anima um valor ao longo do tempo
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 95,
        duration: 100,
        useNativeDriver: false,
      }),

      Animated.timing(logo.y, {
        toValue: 34,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 270,
        duration: 100,
        useNativeDriver: false,
      }),

      Animated.timing(logo.y, {
        toValue: 97,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  return (
    <>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.containerLogo}>
          <Animated.Image
            style={{
              width: logo.x,
              height: logo.y,
            }}
            source={require('../../assets/logo.png')}
          />
        </View>

        <Animated.View
          style={[
            styles.form,
            {
              opacity: opacity,
              transform: [
                {
                  translateY: offset.y,
                },
              ],
            },
          ]}>

          {viewRegister &&
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    autoCorrect={false}
                    onChangeText={text => setRegistro({nome:text,comfirmPassword: dados_registro.comfirmPassword})}
                />
          }
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            value={usuario.email}
            onChangeText={text => {setUser({email:text, password: usuario.password})
                          }}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            //keyboardType="visible-password"
            textContentType="password"
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            value={usuario.password}
            onChangeText={text => {setUser({email:usuario.email,password:text})
                                      }}
          />
          {viewRegister &&
            <TextInput
            style={styles.input}
            placeholder="Comfirma a Senha"
            //keyboardType="visible-password"
            textContentType="password"
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={text => setRegistro({nome:dados_registro.nome,comfirmPassword: text})}
            />
          }

          <TouchableOpacity style={styles.buttonSubmit}
          onPress={ btn_salvar_acessar}
          disabled={!valida}
          >
              <Text style={[styles.submitText, valida? {}: {color: "#AAA"} ] }>{viewRegister ? 'Salvar' : 'Acessar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegister}
          onPress={btn_sair_registra}
          >
            <Text style={styles.registerText}>{viewRegister ? 'Sair' : 'Registrar'}</Text>
          </TouchableOpacity>
          
        </Animated.View>
      </KeyboardAvoidingView>
    </>
  );
}
