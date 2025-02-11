import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    boxContainer: {
        flex: 1,
        margin: 5,
        height: 260,
        width: '50%',
        alignItems: 'center',
    },
    innerContainer: {
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 8,
        margin: 8,
    },
    backgroundImage: {
        borderRadius: 8,
        width: '100%',
    },
    boxTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: 'plum'
    },
    tinyLogo: {
        width: '100%',
        height: 120,
        marginBottom: 5,
        alignSelf: 'center'
    },
});