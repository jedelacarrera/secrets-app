import React, { Component } from 'react';
import Crypto from 'crypto-js'
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { keyPrefix } from '../constants/strings'
import Secret from '../components/Secret'

const encrypted = Crypto.AES.encrypt("Message", "Secret Passphrase").toString();

const decrypted = Crypto.AES.decrypt(encrypted, "Secret Passphrase").toString(Crypto.enc.Utf8);

export default class HomeScreen extends Component {
  state = {
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
      const filteredKeys = keys.filter(key => key.slice(0, keyPrefix.length) === keyPrefix)
      AsyncStorage.multiGet(filteredKeys, (error, values) => {
        if (error) {
          console.log(error);
          this.setState({ errors: 'Error getting values, restart the app.' });
          return;
        }
        const decryptedValues = values.map(values =>
          ({ name: values[0], ...JSON.parse(values[1]) })
        )
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
      <Secret
        key={index}
        item={value}
        delete={() => this.removeKey(value.name)}
      />
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
