import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../helpers/colors';
import {useNavigation} from '@react-navigation/native';
import {moderateScale} from 'react-native-size-matters';

const PokemonCard = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Pokemon Detail Screen', {url: props.item.url})
      }>
      <View style={{flexDirection: 'column'}}>
        <Image
          style={styles.iconCard}
          source={require('../icons/pokeball.png')}
        />
        <Text style={[styles.normalText, {textTransform: 'capitalize'}]}>
          {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
    margin: moderateScale(8),
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: moderateScale(16),
    height: moderateScale(80),
  },
  iconCard: {
    width: moderateScale(40),
    height: moderateScale(40),
    alignSelf: 'center',
    marginTop: moderateScale(8),
  },
  normalText: {
    fontSize: moderateScale(14),
    color: colors.black,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default PokemonCard;
