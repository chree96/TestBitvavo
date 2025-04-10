import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home/Home';
import DetailsScreen from '../screens/details/Details';
import { Screens, StackNavigatorScreens } from './StackNavigator.types';

const Stack = createStackNavigator<StackNavigatorScreens>();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Screens.HOME} component={Home} />
      <Stack.Screen name={Screens.DETAILS} component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export default StackNavigator;