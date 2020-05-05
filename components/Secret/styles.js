import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingLeft: 20,
    },
    firstContainer: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
    },
    secondContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    nameContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    iconsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
        color: '#7d8995',
        fontWeight: 'bold'
    },
    notes: {
        fontSize: 16
    },
    label: {
        flex: 1
    },
    decrypted: {
        color: "green",
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
    },
    error: {
        color: "red",
        flex: 1,
        fontSize: 16,
        textAlign: 'center',
    }

});
