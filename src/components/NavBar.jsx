import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { THEME } from '../theme/theme'
import { AppTextBold } from './AppTextBold'

export const NavBar = ({title}) => {
    return (
        <View style={{...styles.navbar, ...Platform.select({
            ios: styles.navbarIos,
            android: styles.navbarAndroid,
        })}}>
            <AppTextBold style={styles.text}>{title}</AppTextBold>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        paddingBottom: 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    navbarAndroid: {
        backgroundColor: THEME.COLOR_BUSINESS_MAIN,
    },
    navbarIos: {
        borderBottomColor: THEME.COLOR_BUSINESS_MAIN,
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 20,
        color: Platform.OS === 'ios' ? THEME.COLOR_BUSINESS_MAIN : '#fff',
    }
})