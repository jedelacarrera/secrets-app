import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginHorizontal: 20,
    },
    firstContainer: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 70,
    },
    secondContainer: {
        flex: 1,
        minHeight: 55,
        paddingTop: 15,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    nameContainer: {
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    iconsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    name: {
        flex: 2,
        fontSize: 22,
        color: '#7d8995',
        fontWeight: 'bold',
        color: Colors.primary,
        paddingTop: 12,
    },
    notes: {
        flex: 1,
        fontSize: 16,
        paddingBottom: 10,
        color: "#666",
    },
    label: {
        flex: 1
    },
    decrypted: {
        color: "green",
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
    },
    error: {
        color: "red",
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
    }

});
