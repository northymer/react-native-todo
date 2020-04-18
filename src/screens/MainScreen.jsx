import React from 'react'
import { View, StyleSheet, FlatList, Image } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'

export const MainScreen = (props) => {
    const {
        removeTodo,
        addTodo,
        todos,
        onTodoPress,
    } = props

    const content = todos.length
        ? (<FlatList
                data={todos}
                renderItem={({item}) => (
                    <Todo todo={item} onRemove={removeTodo} onOpen={onTodoPress} />
                )}
                keyExtractor={item => item.id.toString()}
            />)
        : ( <View style={styles.noItemsWrapper}>
                <Image style={styles.noItemsImage} source={require("../../assets/no-items.png")} />
            </View>)

    return (
        <View>
            <AddTodo 
                onSubmit={addTodo}
            />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    noItemsWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300,
    },
    noItemsImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    }
})