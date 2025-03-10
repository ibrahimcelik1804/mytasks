import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState, useEffect} from 'react';
import {getItem, setItem} from '../utils/asyncStorage';
import {SCREENS} from '../utils/router';
import OnboardingScreen from '../screens/onboardingScreen';
import HomeScreen from '../screens/homeScreen';
import TodosScreen from '../screens/todosScreen';

const {HOME, ONBOARDING, TODOS} = SCREENS;
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [showOnboarding, setShowOnboarding] = useState(null);

  useEffect(() => {
    const checkIfAlreadyBoarded = async () => {
      try {
        // Veriyi getItem ile alıyoruz
        const onboarded = await getItem('onboarded');
        setShowOnboarding(onboarded !== '1'); // '1' değeri varsa onboarding'i gösterme
      } catch (error) {
        console.error('Error fetching onboarding status:', error);
        setShowOnboarding(true); // Eğer hata varsa onboarding'i göster
      }
    };

    checkIfAlreadyBoarded();
  }, []);

  const handleOnboardingComplete = async () => {
    try {
      // Onboarding tamamlandıysa 'onboarded' key'ini kaydediyoruz
      await setItem('onboarded', '1');
      setShowOnboarding(false); // Onboarding tamamlandığında home ekranını göster
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  // Eğer onboarding durumu hala yükleniyorsa (null) loading state'i döner
  if (showOnboarding === null) {
    return null; // loading state
  }

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={showOnboarding ? ONBOARDING : HOME}>
      <Stack.Screen
        name={ONBOARDING}
        component={OnboardingScreen}
        initialParams={{onComplete: handleOnboardingComplete}}
      />
      <Stack.Screen name={HOME} component={HomeScreen} />
      <Stack.Screen name={TODOS} component={TodosScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
