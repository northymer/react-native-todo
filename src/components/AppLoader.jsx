import React from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { THEME } from '../theme/theme'

export const AppLoader = () => (
    <View style={styles.center}>
        <ActivityIndicator size='large' color={THEME.COLOR_BUSINESS_MAIN} />
    </View>
)

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})