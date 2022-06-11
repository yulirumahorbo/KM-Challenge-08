import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import PokemonCard from '../../components/PokemonCard';
import colors from '../../helpers/colors';

const styles = StyleSheet.create({
  titleText: {
    fontSize: moderateScale(16),
    color: colors.black,
    fontWeight: '600',
    textAlign: 'center',
  },
  normalText: {
    fontSize: moderateScale(14),
    color: colors.black,
    fontWeight: '400',
  },
});

function PokemonList() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);

  const getPokemonList = async () => {
    try {
      setLoading(true);
      const results = await axios.get(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20',
      );
      setPokemon(results.data.results);
    } catch (error) {
      return <Text>Data Tidak Ada</Text>;
    } finally {
      setLoading(false);
    }
    return null;
  };

  useEffect(() => {
    getPokemonList();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.yellow,
        padding: moderateScale(16),
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('Pokemon Bag Screen')}
      >
        <Text style={[styles.normalText, { textAlign: 'right' }]}>
          Pokemon Bag
        </Text>
      </TouchableOpacity>

      <Text style={styles.titleText}>Pokemon List</Text>

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.yellow,
          }}
        >
          <ActivityIndicator color={colors.black} size="large" />
        </View>
      ) : (
        <FlatList
          data={pokemon}
          style={{ marginVertical: 8 }}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <PokemonCard name={item.name} item={item} />
          )}
        />
      )}
    </SafeAreaView>
  );
}

export default PokemonList;
