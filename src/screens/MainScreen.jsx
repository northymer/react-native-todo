import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme/theme'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const MainScreen = (props) => {
    const { addTodo, todos, removeTodo,  } =  useContext(TodoContext)
    const { changeScreen } = useContext(ScreenContext)

    const [deviceWidth, setDeficeWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
            setDeficeWidth(width)
        }
        Dimensions.addEventListener('change', update)
        return () => Dimensions.removeEventListener('change', update)
    })

    const content = todos.length
        ? (<View style={{ width: deviceWidth }}><FlatList
                data={todos}
                renderItem={({item}) => (
                    <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
                )}
                keyExtractor={item => item.id.toString()}
            /></View>)
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