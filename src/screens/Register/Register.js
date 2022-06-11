import React, { useState } from 'react';
import {
  StyleSheet, View, Alert, TextInput,
} from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import colors from '../../helpers/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: moderateScale(28),
    backgroundColor: colors.yellow,
  },
  box: {
    borderRadius: moderateScale(16),
    elevation: moderateScale(16),
    padding: moderateScale(20),
    height: moderateScale(350),
  },
  title: {
    fontSize: moderateScale(40),
    textAlign: 'center',
    color: colors.black,
    marginBottom: moderateScale(20),
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors.white,
    height: moderateScale(50),
    marginBottom: moderateScale(10),
    fontSize: moderateScale(16),
    borderRadius: moderateScale(25),
    padding: moderateScale(12),
    borderColor: colors.lightGray,
    borderWidth: moderateScale(2),
  },
  button: {
    backgroundColor: colors.red,
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    padding: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  regularText: {
    fontWeight: '600',
    fontSize: moderateScale(16),
    color: '#000000',
  },
  normalText: {
    fontSize: moderateScale(14),
    color: colors.black,
    fontWeight: '400',
    textAlign: 'center',
  },
});

function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleRegister = async () => {
    if (name === '' || email === '' || password === '') {
      Alert.alert('Error', 'Fill in all the fields!');
      return false;
    }
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const data = {
        name,
        email: result.user.email,
        id: result.user.uid,
      };
      await database()
        .ref(`/users/${data.id}`)
        .set(data)
        .then(() => {
          Alert.alert('Success', 'Register Successfully!');
          navigation.navigate('Login Screen');
        });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon</Text>
      <Surface style={styles.box}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            autoCapitalize="none"
            autoFocus
            value={name}
            onChangeText={(value) => setName(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onHandleRegister}>
          <Text style={[styles.regularText, { color: colors.white }]}>
            REGISTER
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: moderateScale(8),
          }}
        >
          <Text style={styles.normalText}>Already have Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
            <Text style={styles.normalText}>Login here!</Text>
          </TouchableOpacity>
        </View>
      </Surface>
    </View>
  );
}
export default RegisterScreen;
