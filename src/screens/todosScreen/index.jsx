import {
  Alert,
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Edit from '../../assets/icons/Edit';
import Bin from '../../assets/icons/bin';
import Check from '../../assets/icons/Check';

const TodosScreen = () => {
  // kullanıcı tarafından girilen title ve description ögesini saklamak için state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // task listesini saklamak için state tutmalıyım
  const [tasks, setTasks] = useState([]);

  //task listesini asyncStorage kaydediyoruz
  const saveTasks = async saveTask => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(saveTask));
    } catch (error) {
      console.log('error', error);
    }
  };

  // yeni bir task eklemek için fonk
  const addTask = () => {
    // eger kullanıcı bir metin girdiyse
    if (title && description) {
      // yeni task nesesi olustur
      const newTask = {
        id: uuid.v4(),
        title: title,
        description: description,
      };
      // Task listesine yeni task'i ekleyerek güncelle
      const updateTasks = [...tasks, newTask];
      // task listesini günceliyoruz
      setTasks(updateTasks);

      // yeni asyncStorage kaydediyoruz
      saveTasks(updateTasks);
      setTitle('');
      setDescription('');
    }
  };

  // async storage den tasks listesini yükleme fonksiyonu
  const loadTasks = async () => {
    try {
      // tasks verisini async storage den alıyoruz
      const storageData = await AsyncStorage.getItem('tasks');
      // eger veri, varsa json olarak parse edip tasks statine aktaıyoruz
      if (storageData) {
        setTasks(JSON.parse(storageData));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // task listeini mapleyerek idsi eşleşen ögeyi buluruz
  const completeTask = id => {
    const updatedTasks = tasks.map(item =>
      item.id === id ? {...item, completed: !item.completed} : item,
    );
    // task listesini günceliyoruz
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };
  const deleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks), saveTasks(updatedTasks);
  };
  const updateTasks = id => {
    const existingTask = tasks.find(task => task.id === id);
    if (!existingTask) return;

    Alert.prompt(
      'Edit Task Title',
      'Update your task title:',
      newTitle => {
        if (newTitle) {
          Alert.prompt(
            'Edit Task Description',
            'Update your task description:',
            newDescription => {
              if (newDescription) {
                const updatedTasks = tasks.map(item =>
                  item.id === id
                    ? {...item, title: newTitle, description: newDescription}
                    : item,
                );
                setTasks(updatedTasks);
                saveTasks(updatedTasks);
              }
            },
            'plain-text',
            existingTask.description,
          );
        }
      },
      'plain-text',
      existingTask.title,
    );
  };

  // uyuglama ilk açıldığında task listesini yüklemek için useEfect kullanıyoruz
  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/2.png')}
        style={styles.background}>
        <ImageBackground
          source={require('../../assets/images/1.png')}
          style={styles.overlay}>
          <SafeAreaView style={styles.content}>
            <Text style={styles.title}>My Tasks</Text>

            <View>
              <TextInput
                onChangeText={text =>
                  setTitle(
                    text
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' '),
                  )
                }
                value={title}
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="gray"
              />
              <TextInput
                onChangeText={text => setDescription(text)}
                value={description}
                style={styles.description}
                placeholder="Description"
                placeholderTextColor="gray"
                multiline={true}
              />
              <LinearGradient
                style={styles.gradient}
                locations={[0, 0.98, 1]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#66D2CE', '#ACD4E1', '#ACD4E1']}>
                <TouchableOpacity onPress={addTask} style={styles.button}>
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <FlatList
              data={tasks.slice().reverse()}
              renderItem={({item}) => (
                <View style={styles.itemContainer}>
                  <View style={styles.itemTop}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableOpacity onPress={() => completeTask(item?.id)}>
                        <Check completed={item.completed} />
                      </TouchableOpacity>
                      <Text
                        style={[
                          styles.text,
                          item.completed && {
                            textDecorationLine: 'line-through',
                            color: '#c4c4c4',
                          },
                        ]}>
                        {item.title}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row', gap: 20}}>
                      <TouchableOpacity onPress={() => updateTasks(item.id)}>
                        <Edit />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteTask(item.id)}>
                        <Bin />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.itemBottom}>
                    <Text
                      style={[
                        styles.textd,
                        item.completed && {color: '#c4c4c4'},
                      ]}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              )}
            />
          </SafeAreaView>
        </ImageBackground>
      </ImageBackground>
    </View>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '34%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '28%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: '80%',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
    fontFamily: 'Monda-Medium',
    justifyContent: 'center',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#66D2CE',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontFamily: 'Monda-Medium',
    fontSize: 18,
  },
  description: {
    width: '100%',
    height: 124,
    backgroundColor: '#66D2CE',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontFamily: 'Monda-Medium',
    fontSize: 18,
    textAlignVertical: 'top',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Monda-Medium',
  },
  gradient: {
    borderRadius: 25,
  },
  itemContainer: {},
  itemTop: {
    borderTopColor: '#000000',
    borderBottomWidth: 2,
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 2,
  },
  itemBottom: {},
  text: {
    marginLeft: 20,
    fontFamily: 'Monda-Medium',
    fontSize: 18,
  },
  textd: {
    fontFamily: 'Monda-Medium',
    fontSize: 14,
  },
});
