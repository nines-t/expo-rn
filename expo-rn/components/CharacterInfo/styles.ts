import {StyleSheet, View} from 'react-native';
import {Text} from "@/components/Text";
import {capitalizeFirstLetter} from "@/utils/utils";
import React from "react";

export const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        margin: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        textTransform: 'capitalize'
    },
    statsContainer: {
        gap: 8,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    statName: {
        fontSize: 14,
    },
});