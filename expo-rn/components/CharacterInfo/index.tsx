import React, { useRef, useEffect } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { Text } from '@/components/Text';
import { styles } from './styles';
import { type CharacterInfo } from '@/types/characters';

import { capitalizeFirstLetter } from "@/utils/utils";

type Props = {
    url: string;
    name: string;
    stats: { base_stat: number; stat: { name: string } }[];
    types: string[];
    shiny: string;
};

export function CharacterInfo({
                                name, url,
                                stats, types = [], shiny,
                              }: Props) {

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

                {/* Tipo */}
                <Text style={{ fontWeight: 'bold', marginTop: 10 }}>
                    Tipos: {types?.length ? types.join(', ') : 'Desconocido'}
                </Text>


                {/* Stats */}
                <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Estadísticas:</Text>
                {stats.map((stat, index) => (
                    <Text key={index}>{stat.stat.name}: {stat.base_stat}</Text>
                ))}

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