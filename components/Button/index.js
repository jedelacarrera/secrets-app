import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

export default class Button extends Component {
    static defaultProps = {
        title: 'Create',
        disabled: false,
        onPress: () => { },
        containerStyle: {},
        textStyle: {},
        disabledContainerStyle: {}
    }

    render() {
        const {
            title,
            disabled,
            onPress,
            containerStyle,
            textStyle,
            disabledContainerStyle,
        } = this.props;
        let buttonStyle;

        if (disabled) {
            buttonStyle = {
                ...styles.button,
                ...containerStyle,
                ...styles.disabled,
                ...disabledContainerStyle
            }
        } else {
            buttonStyle = {
                ...styles.button,
                ...containerStyle,
            }
        }

        return (
            <TouchableOpacity
                onPress={onPress}
                disabled={disabled}
            >
                <View style={buttonStyle}>
                    <Text style={[styles.buttonText, textStyle]}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}