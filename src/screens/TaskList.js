import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import todayImage from '../../assets/imgs/today.jpg';
import logoImage from '../../assets/imgs/Sustentec_Logo_Branco_Cores_270-270x97xc.png';
import asyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import 'moment/locale/pt-br';
import CommonStyles from '../commonStyles';
import Task from '../components/Task';
import Icon from 'react-native-vector-icons/FontAwesome';
import AdicionarTask from './AdicionarTask';

const initialState = {
  showAddTask: false,
  showDoneTasks: false,
  tasks: [],
};

export default class Tasks extends Component {
  state = {
    ...initialState,
  };

  componentDidMount = async () => {
    const stateString = await asyncStorage.getItem('taskState');
    const state = JSON.parse(stateString) || initialState;
    this.setState(state);
  };
  toggleFilter = () => {
    this.setState({showDoneTasks: !this.state.showDoneTasks});
    asyncStorage.setItem('taskState', JSON.stringify(this.state));
  };
  toggleTask = (taskId) => {
    const tasks = [...this.state.tasks];
    tasks.forEach((task) => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt === null ? new Date() : null;
      }
    });
    this.setState({tasks});
    asyncStorage.setItem('taskState', JSON.stringify(this.state));
  };
  addTask = (newTask) => {
    if (!newTask.desc.trim() || !newTask.desc) {
      Alert.alert('Dados Invalidos', 'Descrição não informada');
      return;
    }
    const tasks = [...this.state.tasks];
    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.estimateAt,
      doneAt: null,
    });
    this.setState({tasks, showAddTask: false});
    asyncStorage.setItem('taskState', JSON.stringify(this.state));
  };
  delTask = (deleteTask) => {
    const tasks = [...this.state.tasks];
    const newTasks = tasks.filter((task) => task.id != deleteTask);
    this.setState({tasks: newTasks});
    asyncStorage.setItem('taskState', JSON.stringify(this.state));
  };
  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

    return (
      <View style={styles.container}>
        <AdicionarTask
          isVisible={this.state.showAddTask}
          save={this.addTask}
          onCancel={() => {
            this.setState({showAddTask: false})
          }}
        />
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={15}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.logoContainer}>
            <Image source={logoImage} />
          </View>

          <View style={styles.titleBar}>
            {<Text style={styles.title}>{'Hoje'}</Text>}
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList} >
          <FlatList
            data={this.state.tasks.filter((item) => {
              if (this.state.showDoneTasks) {
                return true;
              } else {
                return !item.doneAt;
              }
            })}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({item}) => (
              <Task
                {...item}
                toggleTask={this.toggleTask}
                delete={this.delTask}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          activeOpacity={0.7}
          onPress={() => {
            this.setState({showAddTask: true});
            
          }}>
          <Icon name="plus" size={20} color={CommonStyles.colors.today} />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: CommonStyles.fontFamily,
    fontSize: 50,
    color: CommonStyles.colors.secundary,
    marginBottom: 20,
    marginLeft: 20,
  },
  subtitle: {
    fontFamily: CommonStyles.fontFamily,
    fontSize: 20,
    color: CommonStyles.colors.secundary,
    marginBottom: 20,
    marginLeft: 20,
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
