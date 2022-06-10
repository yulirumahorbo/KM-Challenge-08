/* eslint-disable react-hooks/rules-of-hooks */
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../helpers/colors';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PokemonCard from '../../components/PokemonCard';
import {moderateScale} from 'react-native-size-matters';

const PokemonList = props => {
  const [nextPage, setNextpage] = useState(0);
  const [pokemon, setPokemon] = useState([]);

  const getPokemonList = async nextPage => {
    try {
      const results = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${nextPage}&limit=20`,
      );
      console.log(results);
      setPokemon(results.data.results);
    } catch (error) {
      return <Text>Data Tidak Ada</Text>;
    }
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.yellow,
        paddingVertical: moderateScale(16),
      }}>
      <Text style={styles.titleText}>Pokemon List Screen</Text>
      <FlatList
        data={pokemon}
        style={{margin: 8}}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <PokemonCard name={item.name} item={item} />
        )}
      />
    </SafeAreaView>
  );
};

export default PokemonList;

const styles = StyleSheet.create({
  titleText: {
    fontSize: moderateScale(16),
    color: colors.black,
    fontWeight: '600',
    textAlign: 'center',
  },
});

