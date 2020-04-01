import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { NavBar } from './src/components/NavBar';
import { AddTodo } from './src/components/AddTodo';
import { Todo } from './src/components/Todo';

export default function App() {
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
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <View style={styles.container}>
      <NavBar title="ToDo App" />
      <View style={styles.content}>
        <AddTodo 
          onSubmit={addTodo}
        />
        <FlatList
          data={todos}
          renderItem={({item}) => (
            <Todo todo={item} onRemove={removeTodo} />
          )}
          keyExtractor={item => item.id.toString()}
        />
        <Button title="Clear list" onPress={() => setTodos([])} />
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
