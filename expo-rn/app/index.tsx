import { FlatList, View } from 'react-native'
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
                    ListEmptyComponent={() => <Text center red>No hay elementos</Text>}
                    ListHeaderComponent={() => <Text center color="#fff">Lista de Pokémon</Text>}
                    ListFooterComponent={() => (
                        <Text center color="#fff">
                            {`Total de personajes: ${characters.length}`}
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