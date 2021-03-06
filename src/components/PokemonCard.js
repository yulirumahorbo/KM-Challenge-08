import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import colors from '../helpers/colors';

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

function PokemonCard({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Pokemon Detail Screen', { url: item.url })}
    >
      <View style={{ flexDirection: 'column' }}>
        <Image
          style={styles.iconCard}
          source={require('../icons/pokeball.png')}
        />
        <Text style={[styles.normalText, { textTransform: 'capitalize' }]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default PokemonCard;
