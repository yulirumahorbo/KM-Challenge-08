import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//screens
import HomeScreen from './src/screens/Home/Home';
import PokemonList from './src/screens/PokemonList/PokemonList';
import PokemonDetail from './src/screens/PokemonDetail/PokemonDetail';
import PokemonBag from './src/screens/PokemonBag/PokemonBag';
import PokemonBagDetail from './src/screens/PokemonBag/PokemonBagDetail';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Pokemon List Screen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home Screen" component={HomeScreen} />
        <Stack.Screen name="Pokemon List Screen" component={PokemonList} />
        <Stack.Screen name="Pokemon Detail Screen" component={PokemonDetail} />
        <Stack.Screen name="Pokemon Bag Screen" component={PokemonBag} />
        <Stack.Screen
          name="Pokemon Bag Detail Screen"
          component={PokemonBagDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
