export interface Character {
    id: string;
    name: string;
    url: string;
    image: string;
}

export interface CharacterInfo {
    id: number;
    name: string;
    image: string;
    url: string;
    stats: PokemonStat[];
    types: string[];
    height: number;
    weight: number;
    shiny: string;
}

export interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    };
}