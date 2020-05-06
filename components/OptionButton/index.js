import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors'

export default function OptionButton({ icon, labels, onPress }) {
    return (
        <RectButton style={styles.option} onPress={onPress}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.optionIconContainer}>
                    <Ionicons name={icon} size={22} color={Colors.warningRGBA} />
                </View>
                <View>
                    {labels.map((label, index) => (
                        <Text
                            key={index}
                            style={[styles.optionText, index === 0 && styles.firstOptionText]}
                        >
                            {label}
                        </Text>)
                    )}
                </View>
            </View>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    optionIconContainer: {
        marginRight: 12,
    },
    option: {
        paddingLeft: 15,
        paddingRight: 40,
        paddingVertical: 15,
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1,
        marginBottom: 15,
    },
    firstOptionText: {
        fontWeight: 'bold',
    },
});
