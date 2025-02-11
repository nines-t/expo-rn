import React from 'react'

import { useLocalSearchParams } from 'expo-router';

import { Screen } from '@/components/Screen'
import { MainImage } from '@/components/MainImage'
import { CharacterInfo } from '@/components/CharacterInfo'
import { useCharacterInfo } from '@/api-client/getCharacterInfo'
import { Text } from '@/components/Text'

export default function Pokemon() {
    const { id } = useLocalSearchParams();
    console.log("###################### id/index.tsx ")
    console.log(id)
    const { characterInfo, refreshing, fetchCharacterInfo } = useCharacterInfo({ id })
    console.info('id: ', id, characterInfo)
    if (refreshing || !characterInfo) {
        return <Text center>Cargando...</Text>

    }
    return (
        <Screen title={`${characterInfo.name}`}>
            <MainImage uri={characterInfo.image} />
            <CharacterInfo
                url={characterInfo.url}
                name={characterInfo.name}
                stats={characterInfo.stats}
                types={characterInfo.types}
            />
        </Screen>
    )
}