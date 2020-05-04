import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AES } from 'crypto-js'
import Colors from '../constants/Colors';
import { keyPrefix } from '../constants/strings'
import Input from '../components/Input';
import Button from '../components/Button';

const INITIAL_STATE = {
    name: '',
    password_label: '',
    password: '',
    password_confirm: '',
    secret: '',
    existingKeyError: false,
    successMessage: '',
}

export default class NewScreen extends Component {
    state = INITIAL_STATE

    getInputValidationError() {
        if (this.state.name.length < 2) return 'Name is not valid';
        // if (!this.state.password_label) return 'Choose a password label. Eg. P1';
        // if (this.state.password.length < 4) return 'Passwords must contain at least 4 characters.';
        // if (this.state.password !== this.state.password_confirm) return 'Passwords do not match';
        if (!this.state.secret) return 'Secret does not have a value.';
        return false;
    }

    save = async () => {
        const key = keyPrefix + this.state.name;
        const item = await AsyncStorage.getItem(key);
        if (item) {
            this.setState({ existingKeyError: true, successMessage: '' });
            return;
        }
        const encrypted = AES.encrypt(this.state.secret, "Secret Passphrase").toString();

        await AsyncStorage.setItem(key, encrypted);
        const successMessage = `${this.state.name} was saved successfully`;
        this.clear();
        this.setState({ successMessage });
    }

    clear = () => {
        this.setState(INITIAL_STATE);
    }

    render() {
        const inputValidationError = this.getInputValidationError();

        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Input
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                    placeholder="Eg: Gmail"
                    label="Name"
                    onSubmitEditing={() => this.refs.password_label.focus()}
                />
                <Input
                    ref="password_label"
                    value={this.state.password_label}
                    onChangeText={password_label => this.setState({ password_label })}
                    placeholder="P1 (It may help you remmeber)"
                    label="Password label"
                    onSubmitEditing={() => this.refs.password.focus()}
                />
                <Input
                    ref="password"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                    placeholder="****** (Most secret password)"
                    label="Password"
                    onSubmitEditing={() => this.refs.password_confirm.focus()}
                    secureTextEntry
                />
                <Input
                    ref="password_confirm"
                    value={this.state.password_confirm}
                    onChangeText={password_confirm => this.setState({ password_confirm })}
                    placeholder="****** (Password confirmation)"
                    label="Password Confirmation"
                    onSubmitEditing={() => this.refs.secret.focus()}
                    secureTextEntry
                />
                <Input
                    ref="secret"
                    value={this.state.secret}
                    onChangeText={secret => this.setState({ secret })}
                    placeholder="Gmail Password"
                    label="Secret"
                />
                <Text style={styles.errorText}>
                    {this.state !== INITIAL_STATE && inputValidationError}
                </Text>
                <Text style={styles.errorText}>
                    {this.state.existingKeyError && "Name already exists. Choose another one or delete the existing name in 'Secrets'"}
                </Text>
                <Text style={styles.successText}>
                    {this.state.successMessage}
                </Text>
                <View style={styles.buttonsContainer}>
                    <Button
                        title="Cancel"
                        onPress={this.clear}
                        containerStyle={styles.cancel}
                    />
                    <Button
                        onPress={this.save}
                        disabled={inputValidationError !== false}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        backgroundColor: Colors.backgroundColor,

    },
    contentContainer: {
        paddingTop: 20,
    },
    errorText: {
        color: Colors.errorColor,
        paddingHorizontal: 20,
        paddingBottom: 5,
        fontWeight: 'bold'
    },
    successText: {
        color: Colors.successColor,
        paddingHorizontal: 20,
        paddingBottom: 5,
        fontWeight: 'bold'
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-around'
    },
    cancel: {
        backgroundColor: Colors.warningBackground,
    },
});
