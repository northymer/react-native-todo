import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { NavBar } from './src/components/NavBar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

export default function App() {
  const [todoId, setTodoId] = useState('2')
  const [todos, setTodos] = useState([
    {id: '1', title: 'Create Native App'},
    {id: '2', title: 'Start Earning More'},
    {id: '3', title: 'Blank'},
  ])
  
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
    todo: todoId ? todos.find(({id}) => id === todoId) : null
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: '100%'
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
  }
});
