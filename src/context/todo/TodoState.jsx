import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO, SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS } from '../types'
import { ScreenContext } from '../screen/screenContext'
import { HTTP } from '../../api'

export const TodoState = ({ children }) => {
    const initialState = {
        todos: [],
        loading: false,
        error: null,
    }
    const { changeScreen } = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initialState)

    const addTodo = async (title) => {
        clearError()
        try {
            const data = await HTTP.post('https://react-native-todo-app-d76b6.firebaseio.com/todos.json', { title })
            dispatch({type: ADD_TODO, title, id: data.name})
        } catch (e) {
            showError('Something gone wrong')
        }
        
    }

    const removeTodo = (id) => {
        const todo = state.todos.find(t => t.id === id)
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
                onPress: async () => {
                    changeScreen(null)
                    await HTTP.delete(`https://react-native-todo-app-d76b6.firebaseio.com/todos/${id}.json`)
                    dispatch({type: REMOVE_TODO, id})
                }
            },
            ],
            {cancelable: false},
        )
    }

    const showLoader = () => dispatch({ type: SHOW_LOADER })

    const hideLoader = () => dispatch({ type: HIDE_LOADER })

    const showError = (error) => dispatch({ type: SHOW_ERROR, error })

    const clearError = () => dispatch({ type: CLEAR_ERROR })

    const fetchTodos = async () => {
        showLoader()
        clearError()
        try {
            const data = await HTTP.get('https://react-native-todo-app-d76b6.firebaseio.com/todos.json')
            if (data) {
                const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
                dispatch({ type: FETCH_TODOS, todos })
            } else {
                dispatch({ type: FETCH_TODOS, todos: [] })
            }
        } catch (e) {
            showError('Something gone wrong')
        } finally {
            hideLoader()
        }
    }

    const updateTodo = async (id, title) => {
        clearError()
        try {
            await HTTP.patch(`https://react-native-todo-app-d76b6.firebaseio.com/todos/${id}.json`, {title})
            dispatch({type: UPDATE_TODO, id, title})
        } catch (e) {
            showError('Something gone wrong')
        }
        
    }

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                loading: state.loading,
                error: state.error,
                addTodo,
                removeTodo,
                updateTodo,
                fetchTodos,
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}