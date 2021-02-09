import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import TaskList from './screens/TaskList';
import Login from './screens/Login';

export default () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor="#191919" />
    <Login />
  </>
);
