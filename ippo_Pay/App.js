
import InputPage from './InputPage';
import HomeScreen from './HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();


export default function App() {
  return (
<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="InputPage"
          component={InputPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const HomeScreen = (navigation) => {

//   return (

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     paddingHorizontal: 24,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 16,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: '#666',
//   },
// });
