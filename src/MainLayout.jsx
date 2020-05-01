import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavBar } from './components/NavBar';
import { THEME } from './theme/theme';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { TodoContext } from './context/todo/todoContext';

export const MainLayout = (props) => {
    const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext)
    const [todoId, setTodoId] = useState(null)

    // const addTodo = (title) => {
    //     setTodos(prev => [
    //       ...prev,
    //       {
    //         id: Date.now().toString(),
    //         title,
    //       },
    //     ])
    //   }
    
    // const removeTodo = (id) => {
    // // Works on both Android and iOS
    // const todo = todos.find(todo => todo.id === id)
    // Alert.alert(
    //     'Deleting of element',
    //     `Are you sure you want to delete ${todo.title}?`,
    //     [
    //     {
    //         text: 'Cancel',
    //         style: 'cancel',
    //     },
    //     {
    //         text: 'Delete',
    //         style: 'destructive',
    //         onPress: () => {
    //         setTodoId(null)
    //         setTodos(prev => prev.filter(todo => todo.id !== id))
    //         }
    //     },
    //     ],
    //     {cancelable: false},
    // )
    // }

    // const editTodo = (id, title) => {
    //     const newTodoList = todos.map(todo => todo.id === id ? {id, title} : todo)
    //     setTodos(newTodoList)
    // }

    const onTodoPress = (id) => {
        setTodoId(id)
    }

    const onPressBack = () => {
        setTodoId(null)
    }

    const mainScreenProps = {
        todos,
        addTodo,
        removeTodo,
        onTodoPress,
    }

    const todoScreenProps = {
        removeTodo,
        onPressBack,
        todo: todoId ? todos.find(({id}) => id === todoId) : null,
        updateTodo,
    }

    const content = todoId
    ? <TodoScreen {...todoScreenProps} />
    : <MainScreen {...mainScreenProps} />

    return (
        <View style={styles.container}>
            <NavBar title="ToDo App" />
            <View style={styles.content}>
                { content }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 20,
    }
});
