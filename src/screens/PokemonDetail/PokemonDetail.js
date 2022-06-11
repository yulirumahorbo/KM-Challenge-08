import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale } from 'react-native-size-matters';
import database from '@react-native-firebase/database';
import { useNavigation, useRoute } from '@react-navigation/native';
import colors from '../../helpers/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
    padding: moderateScale(16),
  },
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
  card: {
    width: '45%',
    height: moderateScale(150),
    borderRadius: moderateScale(16),
    borderWidth: moderateScale(2),
    marginTop: moderateScale(8),
    padding: moderateScale(8),
    backgroundColor: colors.white,
  },
  bottonCatch: {
    width: moderateScale(60),
    height: moderateScale(60),
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateScale(16),
    borderRadius: moderateScale(30),
    borderWidth: moderateScale(3),
  },
});

function PokemonDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;
  const url = params ? params.url : null;

  const [pokemonDetail, setPokemonDetail] = useState([]);
  const [pokemonImage, setPokemonImage] = useState([]);
  const [pokemonSpecies, setPokemonSpecies] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPokemonDetail = async () => {
    try {
      const results = await axios.get(`${url}`);
      setPokemonDetail(results.data);
    } catch (error) {
      return <Text>Data Tidak Ada</Text>;
    }
    return null;
  };

  const getPokemonImage = async () => {
    try {
      setLoading(true);
      const results = await axios.get(`${url}`);
      setPokemonImage(results.data.sprites.other.home);
    } catch (error) {
      return <Text>Data Tidak Ada</Text>;
    } finally {
      setLoading(false);
    }
    return null;
  };

  const getPokemonSpecies = async () => {
    try {
      const results = await axios.get(`${url}`);
      setPokemonSpecies(results.data.species);
    } catch (error) {
      return <Text>Data Tidak Ada</Text>;
    }
    return null;
  };

  useEffect(() => {
    getPokemonDetail();
    getPokemonImage();
    getPokemonSpecies();
  }, []);

  const renderType = () => (
    <FlatList
      numColumns={4}
      style={{ marginTop: 8 }}
      data={pokemonDetail.types}
      renderItem={({ item }) => (
        <Text style={styles.normalText}>
          {item.type.name}
          ,
          {' '}
        </Text>
      )}
    />
  );

  const renderAbility = () => (
    <FlatList
      numColumns={4}
      style={{ marginTop: 8 }}
      data={pokemonDetail.abilities}
      renderItem={({ item }) => (
        <Text style={styles.normalText}>
          {item.ability.name}
          ,
          {' '}
        </Text>
      )}
    />
  );

  const renderMoves = () => (
    <FlatList
      numColumns={4}
      style={{ marginTop: 8 }}
      data={pokemonDetail.moves}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View>
          <Text style={styles.normalText}>
            {item.move.name}
            ,
            {' '}
          </Text>
        </View>
      )}
    />
  );

  const spinValue = useState(new Animated.Value(0))[0];

  const spinPokemon = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const opacity = useState(new Animated.Value(0))[0];

  const fadeInBall = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 6000,
      useNativeDriver: true,
    }).start();
  };

  const savePokemon = () => {
    const reference = database().ref('/pokemonBag');
    try {
      reference.push({ name: pokemonDetail.name });
      fadeInBall();
      spinPokemon();
      // Alert.alert('Success', 'Berhasil Menangkap');
    } catch (error) {
      Alert.alert('Oops', 'Gagal Menyimpan Ke PokeBag');
    }
  };

  const spinImage = spinValue.interpolate({
    inputRange: [0, 0.5],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Pokemon Detail</Text>

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
        <>
          <Animated.Image
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              transform: [{ rotate: spinImage }],
            }}
            source={{ uri: pokemonImage.front_default }}
          />
          <Animated.Image
            style={{
              marginTop: moderateScale(-50),
              marginLeft: moderateScale(50),
              width: moderateScale(50),
              height: moderateScale(50),
              backgroundColor: colors.yellow,
              opacity,
            }}
            source={require('../../icons/checklist.png')}
          />
          <Text
            style={[
              styles.titleText,
              { textTransform: 'capitalize', fontSize: moderateScale(18) },
            ]}
          >
            {pokemonDetail.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}
          >
            <View style={styles.card}>
              <Text style={[styles.titleText, { marginBottom: 8 }]}>Profile</Text>
              <Text style={styles.normalText}>
                Height:
                {' '}
                {pokemonDetail.height}
              </Text>
              <Text style={styles.normalText}>
                Weight:
                {' '}
                {pokemonDetail.weight}
              </Text>
              <Text style={styles.normalText}>
                Species:
                {' '}
                {pokemonSpecies.name}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.titleText}>Type</Text>
              {renderType()}
            </View>

            <View style={styles.card}>
              <Text style={styles.titleText}>Ability</Text>
              {renderAbility()}
            </View>

            <View style={styles.card}>
              <Text style={styles.titleText}>Moves</Text>
              {renderMoves()}
            </View>
          </View>
          <TouchableOpacity onPress={() => savePokemon()}>
            <View style={styles.bottonCatch}>
              <Text style={[styles.titleText, { color: colors.green }]}>
                Catch
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Pokemon Bag Screen', {
              pokemonDetail,
            })}
          >
            <Text style={styles.normalText}>Go to Pokemon Bag</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}

export default PokemonDetail;
