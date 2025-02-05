import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Vegeta = () => {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVegetaData();
    }, []);

    const fetchVegetaData = async () => {
        try {
            const response = await fetch('https://dragonball-api.com/api/characters/2');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCharacter(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los datos de Vegeta: ' + err.message);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>{error}</Text>
            </View>
        );
    }

    if (!character) {
        return <View><Text>No se encontraron datos del personaje.</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: character.image }}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.name}>{character.name}</Text>
            <View style={styles.propertyContainer}>
                <Text style={styles.propertyText}>Raza: {character.race}</Text>
                <Text style={styles.propertyText}>Género: {character.gender}</Text>
                <Text style={styles.propertyText}>Ki: {character.ki}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: 810,
        height: 2053,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    propertyContainer: {
        alignItems: 'flex-start',
        width: '100%',
    },
    propertyText: {
        fontSize: 16,
        marginBottom: 5,
    },
    error: {
        color: 'red',
        fontSize: 16,
    },
});

export default Vegeta;