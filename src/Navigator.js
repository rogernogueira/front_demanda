import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Tasklist from './screens/TaskList';
import Login from './screens/Login/';


const mainRoutes = {
    Login:{
        name:'Login',
        screen: Login,
    },
    Home:{
        name:'Home',
        screen: Tasklist,
    },

}
const mainNav = createSwitchNavigator(mainRoutes,{
    initialRouteName:'Login'
})
export default createAppContainer(mainNav)
