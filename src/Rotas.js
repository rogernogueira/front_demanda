import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './screens/Login'
import Home from './screens/TaskList'
import Demandas from './screens/Demandas'
import Preload from './screens/Preload'

import UserContextProvider from '../src/contexts/UserContext';

const Stack = createStackNavigator()


function App() {
  return (
    <UserContextProvider> 
      <NavigationContainer>
      <Stack.Navigator
          initialRouteName="Preload"
          screenOptions={{
            headerShown: false
          }}

      > 
          <Stack.Screen name="Preload" component={Preload} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Demandas" component={Demandas} />
          
      </Stack.Navigator> 
      </NavigationContainer>
    </UserContextProvider>
  )
}

export default App