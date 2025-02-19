import React, { useRef } from 'react';
import { useState, useEffect } from 'react'
import { View, Dimensions, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Screen } from '@/components/Screen';
import { SearchBox } from '@/components/SearchBox';
import { Text } from '@/components/Text';

import { useCharacters } from '@/api-client/getCharacters';
import { type Character } from '@/types/characters'
import { MiniCharacterContainer } from '@/components/MiniCharacterContainer';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 80) / 3;
const SPACING = 10;
const ITEM_WIDTH = CARD_WIDTH + SPACING;

export default function Index() {
    const { characters, refreshing, fetchCharacters, error } = useCharacters();
    const flatListRef = useRef<FlatList>(null);
    const [searchQuery, setSearchQuery] = useState('')
    const [result, setResult] = useState<Character[]>([])

    useEffect(() => {
        if (searchQuery.length === 0) {
            setResult(characters)
        }
        const tmp = characters.filter((character) => character.name.toLowerCase().indexOf(searchQuery.toLowerCase())> -1)
        setResult(tmp)
    }, [searchQuery, characters])

    return (
        <>
            <Screen title="PokeExpo" scroll={false}>
                <View style={styles.container}>
                    {refreshing ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size={80} color="#FFCC00" style={styles.loader} />
                            <Text center color="#fff" style={styles.loadingText}>
                                Cargando Pokémon...
                            </Text>
                        </View>
                    ) : characters.length === 0 ? (
                        <Text center red>No hay elementos</Text>
                    ) : (
                        <FlatList
                            ref={flatListRef}
                            data={characters}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.cardsContainer}
                            renderItem={({ item }) => (
                                <View style={styles.cardWrapper}>
                                    <MiniCharacterContainer character={item} />
                                </View>
                            )}
                            keyExtractor={(item) => item.id}
                            onRefresh={fetchCharacters}
                            refreshing={refreshing}
                            decelerationRate="fast"
                            initialNumToRender={3}
                            snapToInterval={ITEM_WIDTH}
                        />
                    )}

                </View>
            </Screen>
            <SearchBox onChangeText={(v) => setSearchQuery(v)} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loader: {
        transform: [{ scale: 1 }],
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cardsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    cardWrapper: {
        width: CARD_WIDTH,
        height: 120,
        marginHorizontal: SPACING / 2,
    },
    searchPrompt: {
        width: '100%',
        padding: 15,
        alignItems: 'center',
        marginTop: 'auto',
    },
    searchPromptText: {
        fontSize: 16,
        color: '#333',
    },
});
