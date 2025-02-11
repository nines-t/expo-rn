import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FFF',
        borderRadius: 8,
        margin: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        textTransform: 'capitalize'
    },
    statsContainer: {
        gap: 8,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    statName: {
        fontSize: 16,
    },
    statValue: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});