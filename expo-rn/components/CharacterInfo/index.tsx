import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';
import { Text } from '@/components/Text';
import { styles } from './styles';
import { capitalizeFirstLetter } from "@/utils/utils";

type Props = {
    url: string;
    name: string;
};

export function CharacterInfo({ name, url }: Props) {
    const jumpAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(jumpAnim, {
                    toValue: -5,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(jumpAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [jumpAnim]);

    return (
        <View style={localStyles.cardContainer}>

            {/* Información del Pokémon */}
            <View style={localStyles.infoContainer}>
                <Text style={localStyles.title}>
                    {capitalizeFirstLetter(name)}
                </Text>
                    <Text style={localStyles.title}>Número de expansiones en que aparece: </Text>
            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        margin: 16,
        alignItems: 'center',
        elevation: 5, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 12,
    },
    infoContainer: {
        alignItems: 'center',
    },
    key: {
        fontWeight: 'bold',
        color: '#000',
    },
    value: {
        color: '#007AFF',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        textTransform: 'capitalize',
        fontFamily: 'Roboto',
    },
});
