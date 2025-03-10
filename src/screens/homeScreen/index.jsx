import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SCREENS} from '../../utils/router';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {clearTasks, removeItem} from '../../utils/asyncStorage';

const {width, height} = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleReset = async () => {
    await removeItem('onboarded');
    await clearTasks();
    navigation.navigate(SCREENS.ONBOARDING);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lottie}>
        <LottieView
          style={{flex: 1}}
          source={require('../../assets/animations/confetti.json')}
          autoPlay
          loop
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate(SCREENS.TODOS)}>
        <LinearGradient
          style={styles.gradient}
          locations={[0, 0.98, 1]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#4568dc', '#b06ab3', '#b06ab3']}>
          <Text style={styles.text}>New Task Who's in?</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleReset}>
        <LinearGradient
          style={styles.gradient}
          locations={[0, 0.98, 1]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#eecda3', '#ef629f', '#ef629f']}>
          <Text style={styles.text}>Reset</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fef3c7', alignItems: 'center'},
  lottie: {
    width: width * 0.9,
    height: width,
    marginVertical: 40,
  },
  gradient: {
    padding: 15,
    borderRadius: 25,
    marginTop: 25,
    width: width * 0.7,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
