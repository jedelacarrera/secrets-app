import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import Crypto from 'crypto-js'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

const encrypted = Crypto.AES.encrypt("Message", "Secret Passphrase").toString();

const decrypted = Crypto.AES.decrypt(encrypted, "Secret Passphrase").toString(Crypto.enc.Utf8);

// https://docs.expo.io/versions/latest/react-native/asyncstorage/

export default class HomeScreen extends Component {
  state = {
    keys: [],
    values: [],
    errors: '',
  }

  componentDidMount() {
    this.getValues();
  }

  getValues = () => {
    AsyncStorage.getAllKeys((error, keys) => {
      if (error) {
        console.log(error);
        this.setState({ errors: 'Error getting keys, restart the app.' });
        return;
      }
      AsyncStorage.multiGet(keys, (error, values) => {
        if (error) {
          console.log(error);
          this.setState({ errors: 'Error getting values, restart the app.' });
          return;
        }
        const decryptedValues = values.map(values => {
          const decryptedValue = Crypto.AES.decrypt(values[1], "Secret Passphrase").toString(Crypto.enc.Utf8);
          return [values[0], decryptedValue]
        })
        this.setState({ values: decryptedValues });
      });
    });
  }

  removeKey = (key) => {
    AsyncStorage.removeItem(key)
      .then(() => this.getValues());
  }

  renderValues() {
    return this.state.values.map((value, index) => (
      <Text key={index}>{value[0]}: {value[1]}</Text>
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text>{decrypted}</Text>
          {this.renderValues()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
