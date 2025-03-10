import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import Onboarding from 'react-native-onboarding-swiper';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {SCREENS} from '../../utils/router';
import {setItem} from '../../utils/asyncStorage';

const {width} = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate(SCREENS.HOME);
    setItem('onboarded', '1');
  };
  const doneButton = ({...props}) => {
    return (
      <TouchableOpacity {...props}>
        <LinearGradient
          style={styles.gradient}
          locations={[0, 0.98, 1]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#eecda3', '#ef629f', '#ef629f']}>
          <Text style={styles.text}>Done</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{paddingHorizontal: 15}}
        pages={[
          {
            backgroundColor: '#a78bfa',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  style={{flex: 1}}
                  source={require('../../assets/animations/boost.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Manage your tasks',
            subtitle:
              'You can easily manage all of your daily tasks in DoMe for free',
          },
          {
            backgroundColor: '#a78bfa',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  style={{flex: 1}}
                  source={require('../../assets/animations/achieve.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Create daily routine',
            subtitle:
              'In Uptodo  you can create your personalized routine to stay productive',
          },
          {
            backgroundColor: '#a78bfa',
            image: (
              <View style={styles.lottie}>
                <LottieView
                  style={{flex: 1}}
                  source={require('../../assets/animations/work.json')}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Orgonaize your tasks',
            subtitle:
              'You can organize your daily tasks by adding your tasks into separate categories',
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  lottie: {
    width: width * 0.9,
    height: width,
    marginVertical: 40,
  },
  gradient: {
    padding: 15,
    borderRadius: 25,
    marginRight: 25,
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
