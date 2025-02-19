import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from 'expo-router';
import { type Character } from '@/types/characters';

type Props = {
    character: Character
}

export function MiniCharacterContainer({ character }: Props) {
    return (
        <Link href={`/character/${character.id}`} asChild>
            <TouchableOpacity style={styles.cardContainer} activeOpacity={0.7}>
                <View style={styles.bevel3dContainer}>
                    <View style={styles.innerContainer}>
                        <Image
                            source={{ uri: character.image }}
                            style={styles.pokemonImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: '100%',
    },
    bevel3dContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderTopColor: '#FFFFFF',
        borderLeftColor: '#FFFFFF',
        borderBottomColor: '#999999',
        borderRightColor: '#999999',
    },
    innerContainer: {
        width: '94%',
        height: '94%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        borderTopColor: '#DDDDDD',
        borderLeftColor: '#DDDDDD',
        borderBottomColor: '#FFFFFF',
        borderRightColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },
    pokemonImage: {
        width: '85%',
        height: '85%',
        borderRadius: 6,
    },
});