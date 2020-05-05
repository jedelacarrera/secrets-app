
import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default styles = StyleSheet.create({
    button: {
        paddingHorizontal: 50,
        borderRadius: 5,
        paddingVertical: 5,
        backgroundColor: Colors.primary,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    disabled: {
        opacity: 0.5
    }
});
