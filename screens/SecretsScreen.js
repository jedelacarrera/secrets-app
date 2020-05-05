import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { keyPrefix } from '../constants/strings'
import Colors from '../constants/Colors'
import Secret from '../components/Secret'


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
        const parsedValues = values.map(values => ({ name: values[0], ...JSON.parse(values[1]) }));
        this.setState({ values: parsedValues });
      });
    });
  }

  removeKey = (key) => {
    AsyncStorage.removeItem(key)
      .then(() => this.getValues());
  }

  renderValues() {
    if (!this.state.values.length) {
      return (
        <View style={styles.defaultTextContainer}>
          <Text style={styles.defaultText}>Go to the "New" tab to save secrets</Text>
        </View>
      );
    }
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
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {this.renderValues()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    paddingTop: 10,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  defaultText: {
    alignSelf: 'center',
    fontSize: 20,
    color: Colors.unfocused,
  },
  defaultTextContainer: {
    flex: 1,
    marginTop: 250,
  }
});
