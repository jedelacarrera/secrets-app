import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import Crypto from 'crypto-js'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { MonoText } from '../components/StyledText';

const encrypted = Crypto.AES.encrypt("Message", "Secret Passphrase").toString();

const decrypted = Crypto.AES.decrypt(encrypted, "Secret Passphrase2").toString(Crypto.enc.Utf8);
console.log(decrypted)

// https://docs.expo.io/versions/latest/react-native/asyncstorage/

export default class HomeScreen extends Component {
  state = {
    keys: [],
  }

  componentDidMount() {
    this.getKeys();
  }

  getKeys = () => {
    AsyncStorage.getAllKeys((_err, keys) => {
      this.setState({ keys });
    });
  }

  removeKey = (key) => {
    AsyncStorage.removeItem(key)
      .then(() => this.getKeys());
  }

  renderKeys() {
    return this.state.keys.map(key => (
      <Text key={key}>Hi {key}</Text>
    ));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Text>{decrypted}</Text>
          {this.renderKeys()}
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
