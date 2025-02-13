import { useEffect, useState } from 'react'
import { CharacterInfo } from '@/types/characters'

interface PokemonInfo {
    id: number;
    name: string;
    height: number;
    weight: number;
    types: {
        type: {
            name: string;
        };
    }[];
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
                front_shiny: string;
            };
        };
    };
    stats: {
        base_stat: number;
        stat: {
            name: string;
        };
    }[];
}

type Props = {
    id: number
}

export function useCharacterInfo({ id }: Props) {
    const [characterInfo, setCharacterInfo] = useState<CharacterInfo>()
    const [refreshing, setRefreshing] = useState(false)

    async function fetchCharacterInfo() {
        try {
            setRefreshing(true)
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const json: PokemonInfo = await response.json()

            console.log("📊 JSON recibido de la API:", json);
            console.log("🔍 Tipos del Pokémon:", json.types);

            setCharacterInfo({
                id: json.id,
                name: json.name,
                image: json.sprites.other['official-artwork'].front_default,
                url: `https://pokeapi.co/api/v2/pokemon/${id}`,
                stats: json.stats,
                types: json.types.map(type => type.type.name),
                height: json.height / 10,
                weight: json.weight / 10,
                shiny: json.sprites.other['official-artwork'].front_shiny,
            })
        } catch (error) {
            console.error('❌ Error al obtener los datos:', error);
        } finally {
            setRefreshing(false)
        }
    }

    useEffect(() => {
        fetchCharacterInfo()
    }, [id])

    return {
        characterInfo,
        refreshing,
        fetchCharacterInfo,
    }
}