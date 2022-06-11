import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import LoginScreen from './src/screens/Login/Login';
import RegisterScreen from './src/screens/Register/Register';
import PokemonList from './src/screens/PokemonList/PokemonList';
import PokemonDetail from './src/screens/PokemonDetail/PokemonDetail';
import PokemonBag from './src/screens/PokemonBag/PokemonBag';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login Screen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login Screen" component={LoginScreen} />
        <Stack.Screen name="Register Screen" component={RegisterScreen} />
        <Stack.Screen name="Pokemon List Screen" component={PokemonList} />
        <Stack.Screen name="Pokemon Detail Screen" component={PokemonDetail} />
        <Stack.Screen name="Pokemon Bag Screen" component={PokemonBag} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
