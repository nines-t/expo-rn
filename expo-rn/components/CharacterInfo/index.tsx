import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { styles } from './styles';
import { type CharacterInfo } from '@/types/characters';

import { capitalizeFirstLetter } from "@/utils/utils";

export function CharacterInfo({
                                name,
                                  url
                              }: CharacterInfo) {

    const jumpAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Secuencia infinita: sube y baja en bucle
        Animated.loop(
            Animated.sequence([
                Animated.timing(jumpAnim, {
                    toValue: -5, // Ajusta la distancia de "salto"
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
        <View style={styles.container}>
            {/* Informacion principal */}
            <View style={styles.title}>
                {/* Name */}
                <Text style={localStyles.line}>
                    <Text style={localStyles.key}>Nombre: </Text>
                    <Text style={localStyles.value}>
                        {capitalizeFirstLetter(name)}
                    </Text>
                </Text>

                {/* Url */}
                <Text style={localStyles.line}>
                    <Text style={localStyles.key}>URL: </Text>
                    <Text style={localStyles.value}>{url}</Text>
                </Text>

            </View>
        </View>
    );
}

const localStyles = StyleSheet.create({
    line: {
        marginBottom: 6,
        flexWrap: 'wrap',
    },
    key: {
        color: 'yellow',
        fontWeight: 'bold',
    },
    value: {
        color: 'white',
    },
    sectionTitle: {
        marginBottom: 10,
        color: 'yellow',
    },
    transformationBox: {
        marginBottom: 15,
    },
});