import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import Crypto from 'crypto-js'
import Input from '../Input';
import styles from './styles';
import Colors from '../../constants/Colors';
import { keyPrefix } from '../../constants/strings';

export default class Secret extends Component {
    static defaultProps = {
        item: {
            name: '',
            secret: '',
            label: '',
            notes: '',
        },
        delete: () => { },
    }

    state = {
        password: '',
        selected: false,
        decryptedSecret: '',
        valid: false,
    }

    decrypt = password => {
        if (password.length < 2) {
            this.setState({ password, decryptedSecret: '', valid: false });
            return;
        }
        let valid = true;
        let decryptedSecret;
        try {
            decryptedSecret = Crypto.AES.decrypt(this.props.item.secret, password).toString(Crypto.enc.Utf8)
            if (!decryptedSecret) {
                decryptedSecret = 'Invalid password';
                valid = false;
            }
        } catch (_error) {
            valid = false;
            decryptedSecret = 'Invalid password';
        }
        this.setState({
            password,
            decryptedSecret,
            valid,
        });
    }

    confirmDelete = () => {
        Alert.alert(
            'Delete',
            `Are you sure you want to delete ${this.state.name}?`,
            [
                {
                    text: 'No',
                    onPress: () => { },
                },
                {
                    text: 'Yes',
                    onPress: this.props.delete,
                },
            ],
            { cancelable: true },
        );
    }

    renderPasswordView() {
        const { selected, decryptedSecret, valid } = this.state;
        if (!selected) return;
        const { label } = this.props.item;

        return (
            <View style={styles.secondContainer}>
                <Input
                    value={this.state.password}
                    onChangeText={this.decrypt}
                    placeholder="******"
                    label={`Write ${label} password`}
                    secureTextEntry
                />
                <Text style={valid ? styles.decrypted : styles.error}>{decryptedSecret}</Text>
            </View>
        );
    }

    render() {
        const {
            name,
            notes,
        } = this.props.item;

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.firstContainer} onPress={() => this.setState({ selected: !this.state.selected })}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{name.slice(keyPrefix.length)}</Text>
                        <Text style={styles.notes}>{notes}</Text>
                    </View>
                    <View style={styles.iconsContainer}>
                        {/* <Ionicons
                            name="md-eye"
                            size={25}
                            color={Colors.primary}
                        /> */}
                        <Ionicons
                            name="md-trash"
                            size={25}
                            onPress={this.confirmDelete}
                            color={Colors.warningRGBA}
                        />
                    </View>
                </TouchableOpacity>
                {this.renderPasswordView()}
            </View>
        )
    }
}