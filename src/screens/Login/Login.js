import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    height: moderateScale(250),
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

function LoginScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then((value) => {
        if (value !== null) {
          navigation.navigate('Pokemon List Screen');
          setLoading(true);
        }
      });
    } catch (error) {
      Alert.alert('Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
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

  const onHandleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Fill in all the fields!');
      return false;
    }
    try {
      await auth().signInWithEmailAndPassword(email, password);
      await database()
        .ref('users/')
        .orderByChild('email')
        .equalTo(email)
        .once('value')
        .then((snapshot) => {
          const userData = Object.values(snapshot.val())[0];
          AsyncStorage.setItem('UserData', JSON.stringify(userData));
          navigation.navigate('Pokemon List Screen', { userData });
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

        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={[styles.regularText, { color: colors.white }]}>LOGIN</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: moderateScale(8),
          }}
        >
          <Text style={styles.normalText}>Not have Account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register Screen')}
          >
            <Text style={styles.normalText}>Register here!</Text>
          </TouchableOpacity>
        </View>
      </Surface>
    </View>
  );
}

export default LoginScreen;
