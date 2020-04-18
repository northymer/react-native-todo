import React from 'react'
import { View, StyleSheet } from 'react-native'
import { THEME } from '../theme/theme'
import { AppTextBold } from './AppTextBold'

export const NavBar = ({title}) => {
    return (
        <View style={styles.navbar}>
            <AppTextBold style={styles.text}>{title}</AppTextBold>
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