import { useEffect, useState } from 'react'
import { Character } from '@/types/characters'

interface PokemonResult {
    name: string;
    url: string;
}

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PokemonResult[];
}

export function useCharacters() {
    const [characters, setCharacters] = useState<Character[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function fetchCharacters() {
        try {
            setRefreshing(true)
            setError(null)
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=30')
            const json: ApiResponse = await response.json()

            const processedResults = json.results.map(pokemon => {
                const id = pokemon.url.split('/').filter(Boolean).pop() || ''
                return {
                    id,
                    name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
                    url: pokemon.url,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
                    image_shiny: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`,
                }
            })

            setCharacters(processedResults)
        } catch (error) {
            console.error('error: ', error)
            setError('Error al cargar los pokémon')
        } finally {
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchCharacters()
    }, [])

    return {
        characters,
        refreshing,
        fetchCharacters,
        error
    }
}