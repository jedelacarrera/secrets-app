import React, { Component } from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from './styles';

export default class Input extends Component {
    static defaultProps = {
        autoCapitalize: 'none',
        label: '',
        multiline: false,
        onChangeText: () => { },
        onSubmitEditing: () => { },
        placeholder: '',
        secureTextEntry: false,
        value: '',
    }

    focus() {
        this.refs.input.focus();
    }

    render() {
        const {
            autoCapitalize,
            label,
            multiline,
            onChangeText,
            onSubmitEditing,
            placeholder,
            secureTextEntry,
            value,
        } = this.props;
        const { inputStyle, labelStyle, containerStyle } = styles;

        return (
            <View style={containerStyle}>
                <Text style={labelStyle}>{label}</Text>
                <TextInput
                    ref="input"
                    returnKeyType="next"
                    value={value}
                    onChangeText={onChangeText}
                    autoCorrect={false}
                    placeholder={placeholder}
                    style={inputStyle}
                    secureTextEntry={secureTextEntry}
                    onSubmitEditing={onSubmitEditing}
                    autoCapitalize={autoCapitalize}
                    multiline={multiline}
                />
            </View>
        )
    }
}