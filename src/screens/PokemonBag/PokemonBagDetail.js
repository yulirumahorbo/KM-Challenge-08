import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Alert,
  Animated,
  Easing,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../helpers/colors';
import {moderateScale} from 'react-native-size-matters';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';

const PokemonBagDetail = props => {
  const navigation = useNavigation();
  const {params} = props.route;
  const url = params ? params.url : null;
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const [pokemonImage, setPokemonImage] = useState([]);
  const [pokemonSpecies, setPokemonSpecies] = useState([]);
  const [disableCatch, setDisableCatch] = useState(false);

  const getPokemonDetail = async () => {
    try {
      const results = await axios.get(`${url}`);
      console.log(results);
      setPokemonDetail(results.data);
    } catch (error) {
      return <Text>Data Tidak Ada</Text>;
    }
  };

  const getPokemonImage = async () => {
    try {
      const results = await axios.get(`${url}`);
      console.log(results);
      setPokemonImage(results.data.sprites.other.home);
    } catch (error) {
      return <Text>Data Tidak Ada</Text>;
    }
  };

  const getPokemonSpecies = async () => {
    try {
      const results = await axios.get(`${url}`);
      console.log(results);
      setPokemonSpecies(results.data.species);
    } catch (error) {
      return <Text>Data Tidak Ada</Text>;
    }
  };

  useEffect(() => {
    getPokemonDetail();
    getPokemonImage();
    getPokemonSpecies();
  }, []);

  const renderType = () => {
    return (
      <FlatList
        numColumns={4}
        style={{marginTop: 8}}
        data={pokemonDetail.types}
        renderItem={({item, index}) => (
          <Text style={styles.normalText}>{item.type.name}, </Text>
        )}
      />
    );
  };

  const renderAbility = () => {
    return (
      <FlatList
        numColumns={4}
        style={{marginTop: 8}}
        data={pokemonDetail.abilities}
        renderItem={({item, index}) => (
          <Text style={styles.normalText}>{item.ability.name}, </Text>
        )}
      />
    );
  };

  const renderMoves = () => {
    return (
      <FlatList
        numColumns={4}
        style={{marginTop: 8}}
        data={pokemonDetail.moves}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <View>
            <Text style={styles.normalText}>{item.move.name}, </Text>
          </View>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Pokemon Detail</Text>
      <Animated.Image
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
          transform: [{rotate: spinImage}],
        }}
        source={{uri: pokemonImage.front_default}}
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
          {textTransform: 'capitalize', fontSize: moderateScale(18)},
        ]}>
        {pokemonDetail.name}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}>
        <View style={styles.card}>
          <Text style={[styles.titleText, {marginBottom: 8}]}>Profile</Text>
          <Text style={styles.normalText}>Height : {pokemonDetail.height}</Text>
          <Text style={styles.normalText}>Weight : {pokemonDetail.weight}</Text>
          <Text style={styles.normalText}>Species : {pokemonSpecies.name}</Text>
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
    </SafeAreaView>
  );
};

export default PokemonBagDetail;

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