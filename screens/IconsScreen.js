import * as React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default function IconsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'white' }}>
            <View>
                <Ionicons
                    name="md-lock"
                    size={300}
                    color={Colors.primary}
                />
                <Text style={{ color: "#f4ab40", fontSize: 45, fontWeight: 'bold', alignSelf: 'center', marginTop: -20 }}>Secrets</Text>
            </View>
        </View>
    );
}
