import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default styles = StyleSheet.create({
    inputStyle: {
        color: '#444',
        marginRight: 12,
        fontSize: 20,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    labelStyle: {
        fontSize: 16,
        color: '#7d8995',
        fontWeight: 'bold',
        color: Colors.primary,
    },
    containerStyle: {
        minHeight: 55,
        // paddingLeft: 20,
        marginBottom: 12,
        flex: 1,
    },
});
