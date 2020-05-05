import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';
import OptionButton from '../components/OptionButton';

const AESDocs = {
  texts: [
    "The secrets are encrypted using AES algorithm.",
    "It is known as a symmetric algorithm, so the ONLY way to decrypt the secret is knowing the password",
    "That's why it is really important to use a non-obvious password like your date of birth or '1234'",
    "You MUST remember the password, no one will be able to help you if you forget it",
    "Touch here yo learn more!"
  ],
  url: 'https://es.wikipedia.org/wiki/Advanced_Encryption_Standard'
}

const RepoDocs = {
  texts: [
    "This is an Open Source project!",
    "If you want to read the source code or suggest new changes you can do it here"
  ],
  url: 'https://github.com/jedelacarrera/secrets-app'
}

const IssuesDocs = {
  texts: [
    "Did you find an error?",
    "Is something not working properly on your phone?",
    "Create an issue here! It will most likely be solved in a few days"
  ],
  url: 'https://github.com/jedelacarrera/secrets-app/issues'
}

function openBrowser(url) {
  WebBrowser.openBrowserAsync(url);
}
export default function DocsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <OptionButton
        icon="md-school"
        labels={AESDocs.texts}
        onPress={() => openBrowser(AESDocs.url)}
      />

      <OptionButton
        icon="logo-github"
        labels={RepoDocs.texts}
        onPress={() => openBrowser(RepoDocs.url)}
      />

      <OptionButton
        icon="ios-chatboxes"
        labels={IssuesDocs.texts}
        onPress={() => openBrowser(IssuesDocs.url)}
        isLastOption
      />
    </ScrollView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
});
