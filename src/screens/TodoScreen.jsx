import React, { useState } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { THEME } from '../theme/theme'
import { AppCard } from '../components/AppCard'
import { EditModal } from '../components/EditModal'

export const TodoScreen = (props) => {
    const {
        removeTodo,
        onPressBack,
        todo,
        editTodo,
    } = props

    const [modal, setModal] = useState(false)
    return(
        <View style={styles.todoScreen}>
            <AppCard style={styles.card}>
                <Text style={styles.title}>{todo.title}</Text>
                <Button title="Edit" onPress={() => setModal(true)} />
            </AppCard>
            <View style={styles.buttonsWrapper}>
                <View style={styles.button}>
                    <Button title="Back" color={THEME.COLOR_GREY} onPress={onPressBack} />
                </View>
                <View style={styles.button}>
                    <Button title="Delete" color={THEME.COLOR_DANGER} onPress={() => removeTodo(todo.id)} />
                </View>
            </View>
            <EditModal
                visible={modal}
                value={todo.title}
                onCancel={() => setModal(false)}
                id={todo.id}
                onSave={editTodo}
            />
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