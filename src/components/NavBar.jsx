import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { THEME } from '../theme/theme'

export const NavBar = ({title}) => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        paddingBottom: 10,
        backgroundColor: THEME.COLOR_BUSINESS_MAIN,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: '#fff',
    }
})