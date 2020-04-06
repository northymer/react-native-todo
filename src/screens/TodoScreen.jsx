import React from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { THEME } from '../theme/theme'
import { AppCard } from '../components/AppCard'

export const TodoScreen = (props) => {
    const {
        removeTodo,
        onPressBack,
        todo,
    } = props
    return(
        <View style={styles.todoScreen}>
            <AppCard style={styles.card}>
                <Text style={styles.title}>{todo.title}</Text>
                <Button title="Edit" />
            </AppCard>
            <View style={styles.buttonsWrapper}>
                <View style={styles.button}>
                    <Button title="Back" color={THEME.COLOR_GREY} onPress={onPressBack} />
                </View>
                <View style={styles.button}>
                    <Button title="Delete" color={THEME.COLOR_DANGER} onPress={() => removeTodo(todo.id)} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    todoScreen: {
        flex: 1,
    },
    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        marginBottom: 20,
        padding: 15,
    },
    button: {
        width: '40%'
    },
    title: {
        fontSize: 20,
    }
})