import React, { useState } from 'react'
import { View, StyleSheet, Button, FlatList } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'

export const MainScreen = (props) => {
    const {
        removeTodo,
        addTodo,
        todos,
        setTodos,
        onTodoPress,
    } = props

    return (
        <View style={styles.mainScreen}>
            <AddTodo 
                onSubmit={addTodo}
            />
            <FlatList
                data={todos}
                renderItem={({item}) => (
                    <Todo todo={item} onRemove={removeTodo} onOpen={onTodoPress} />
                )}
                keyExtractor={item => item.id.toString()}
            />
            <Button title="Clear list" onPress={() => setTodos([])} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainScreen: {
        flex: 1,
    }
})