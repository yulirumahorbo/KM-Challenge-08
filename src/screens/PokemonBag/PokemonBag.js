/* eslint-disable react-hooks/rules-of-hooks */
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import database from '@react-native-firebase/database';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import PokemonBagCard from '../../components/PokemonBagCard';

const PokemonBag = props => {
  const [pokemonBag, setPokemonBag] = useState([]);
  const [key, setKey] = useState([]);

  useEffect(() => {
    fetchPokeBagData();
  }, []);

  const fetchPokeBagData = () => {
    const reference = database().ref('/pokemonBag');
    reference.on('value', snapshot => {
      GetData(snapshot.val());
      console.log(snapshot);
    });
  };

  const GetData = data => {
    let keyFirebase = [];
    keyFirebase = Object.keys(data);
    setKey(keyFirebase);
    console.log(key);
    setPokemonBag(data);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.yellow,
        paddingVertical: moderateScale(16),
      }}>
      <Text style={styles.titleText}>Pokemon Bag Screen</Text>
      <FlatList
        data={key}
        style={{margin: 8}}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <PokemonBagCard name={pokemonBag[item].name} item={item} pokemonBag />
        )}
      />
    </SafeAreaView>
  );
};

export default PokemonBag;

const styles = StyleSheet.create({
  titleText: {
    fontSize: moderateScale(16),
    color: colors.black,
    fontWeight: '600',
    textAlign: 'center',
  },
});
