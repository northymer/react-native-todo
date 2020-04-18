import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

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
                <Text style={styles.title}>{title}</Text>
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
    title: {
        fontFamily: 'roboto-bold'
    }
})