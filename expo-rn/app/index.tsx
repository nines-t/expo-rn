import { FlatList, View, ActivityIndicator, StyleSheet } from 'react-native'
import { CharacterContainer } from '@/components/CharacterContainer'
import { Screen } from '@/components/Screen'
import { SearchBox } from '@/components/SearchBox'
import { Text } from '@/components/Text'
import { useCharacters } from '@/api-client/getCharacters'

interface Pokemon {
    id: string;
    name: string;
    url: string;
}

export default function Index() {
    const { characters, refreshing, fetchCharacters, error } = useCharacters()

    if (error) {
        return (
            <Screen title="PokeExpo">
                <Text center red>{error}</Text>
            </Screen>
        )
    }

    return (
        <>
            <Screen title="PokeExpo" scroll={false}>
                <FlatList
                    refreshing={refreshing}
                    onRefresh={fetchCharacters}
                    data={characters}
                    renderItem={({ item }) => <CharacterContainer key={item.id} character={item} />}
                    ListEmptyComponent={() =>
                        refreshing ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size={80} color="#FFCC00" style={styles.loader} />
                                <Text center color="#fff" style={styles.loadingText}>
                                    Cargando Pokémon...
                                </Text>
                            </View>
                        ) : (
                            <Text center red>No hay elementos</Text>
                        )
                    }
                    ListHeaderComponent={() => <Text center color="#fff">Lista de Pokémon</Text>}
                    ListFooterComponent={() => (
                        <Text center color="#fff">
                            {`Total de Pokemons cargados al azar: ${characters.length}`}
                        </Text>
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    style={{
                        marginBottom: 100,
                    }}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                />
            </Screen>
            <SearchBox />
        </>
    )
}

const styles = StyleSheet.create({
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
})
