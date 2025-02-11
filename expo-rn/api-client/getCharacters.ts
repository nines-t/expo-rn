import { useEffect, useState } from 'react'
import { Character } from '@/types/characters'

export function useCharacters() {
    const [characters, setCharacters] = useState<Character[]>([])
    const [refreshing, setRefreshing] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function fetchTotalPokemon(): Promise<number> {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1')
            const json = await response.json()
            return json.count // Total de Pokémon en la API
        } catch (error) {
            console.error('Error obteniendo el total de Pokémon:', error)
            return 1025
        }
    }

    async function fetchPokemonById(id: number): Promise<Character | null> {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            if (!response.ok) throw new Error(`Error en ID ${id}`)

            const data = await response.json()
            return {
                id: data.id.toString(),
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                url: `https://pokeapi.co/api/v2/pokemon/${id}`,
                image: data.sprites.other['official-artwork'].front_default,
                image_shiny: data.sprites.other['official-artwork'].front_shiny,
            }
        } catch (error) {
            console.warn(`Pokemon con ID ${id} no encontrado, generando otro...`)
            return null
        }
    }

    async function fetchCharacters() {
        setRefreshing(true)
        setError(null)
        try {
            const totalPokemons = await fetchTotalPokemon()
            const randomIds = new Set<number>()
            const validCharacters: Character[] = []

            while (validCharacters.length < 12) {
                const randomId = Math.floor(Math.random() * totalPokemons) + 1
                if (randomIds.has(randomId)) continue

                randomIds.add(randomId)
                const character = await fetchPokemonById(randomId)

                if (character) {
                    validCharacters.push(character)
                }
            }

            setCharacters(validCharacters)
        } catch (error) {
            console.error('Error al cargar los Pokémon:', error)
            setError('Error al cargar los Pokémon')
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
