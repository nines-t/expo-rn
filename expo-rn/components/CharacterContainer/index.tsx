import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native"
import { Link } from 'expo-router';

import { styles } from "./styles"

import { type Character } from '@/types/characters'
import imageBackground from '@/assets/images/background_1.jpg'

type Props = {
    character: Character
}

export function CharacterContainer({ character }: Props) {
    const [bgColor, setBgColor] = useState('#CCC')
    return (
        <View style={styles.boxContainer}>

            <Link href={`/character/${character.id}`} >

                    <View style={styles.innerContainer}>
                        <Text style={styles.boxTitle}>
                            {character.name}
                        </Text>
                        <Image
                            source={{ uri: character.image }}
                            style={styles.tinyLogo}
                            resizeMode="contain"
                        />
                        <Text style={{ color: '#000' }}>Nombre: {character.name}</Text>
                        <Text style={{ color: '#000' }}>Numero en la pokédex: {character.id}</Text>

                    </View>
            </Link>
        </View>
    )
}