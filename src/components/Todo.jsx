import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AppTextRegular } from './AppTextRegular'

export const Todo = ({todo, onRemove, onOpen}) => {
    const {
        title,
        id,
    } = todo

    const longPressHandler = () => {
        onRemove(id)
    }

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onOpen(id)}
            onLongPress={longPressHandler}>
            <View style={styles.todo}>
                <AppTextRegular>{title}</AppTextRegular>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10,
    },
})