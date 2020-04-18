import React, { useState } from 'react';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import { StyleSheet, View, Alert } from 'react-native';
import { NavBar } from './src/components/NavBar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([
    {id: '1', title: 'React Native App'}
  ])

  if (!isReady) {
    return <AppLoading
      onError={err => console.log(err)}
      startAsync={loadApplication}
      onFinish={() => setIsReady(true)}
    />
  }
  
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
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  }
});
