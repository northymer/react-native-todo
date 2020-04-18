import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { NavBar } from './components/NavBar';
import { THEME } from './theme/theme';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';

export const MainLayout = (props) => {
    const [todoId, setTodoId] = useState(null)
    const [todos, setTodos] = useState([])

    const addTodo = (title) => {
        setTodos(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            title,
          },
        ])
      }
    
    const removeTodo = (id) => {
    // Works on both Android and iOS
    const todo = todos.find(todo => todo.id === id)
    Alert.alert(
        'Deleting of element',
        `Are you sure you want to delete ${todo.title}?`,
        [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
            setTodoId(null)
            setTodos(prev => prev.filter(todo => todo.id !== id))
            }
        },
        ],
        {cancelable: false},
    )
    }

    const editTodo = (id, title) => {
    const newTodoList = todos.map(todo => todo.id === id ? {id, title} : todo)
    setTodos(newTodoList)
    }

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
    setTodos,
    onTodoPress,
    }

    const todoScreenProps = {
    removeTodo,
    onPressBack,
    todo: todoId ? todos.find(({id}) => id === todoId) : null,
    editTodo,
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
