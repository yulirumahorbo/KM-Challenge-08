import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import database from '@react-native-firebase/database';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import colors from '../../helpers/colors';
import PokemonCard from '../../components/PokemonCard';

const styles = StyleSheet.create({
  titleText: {
    fontSize: moderateScale(16),
    color: colors.black,
    fontWeight: '600',
    textAlign: 'center',
  },
});

function PokemonBag() {
  const [pokemonBag, setPokemonBag] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllPokemonData = async () => {
    try {
      setLoading(true);
      await database()
        .ref('pokemonBag/')
        .once('value')
        .then((snapshot) => {
          const allPokemonData = Object.values(snapshot.val());
          setPokemonBag(allPokemonData);
        });
    } catch (error) {
      Alert.alert('Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPokemonData();
  }, []);

  if (loading) {
    return (
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
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.yellow,
        paddingVertical: moderateScale(16),
      }}
    >
      <Text style={styles.titleText}>Pokemon Bag Screen</Text>
      <FlatList
        data={pokemonBag}
        style={{ margin: 8 }}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PokemonCard name={item.name} item={item} />
        )}
      />
    </SafeAreaView>
  );
}

export default PokemonBag;
