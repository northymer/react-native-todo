import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native'

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('')

    const pressHandler = () => {
        if (value.trim() !== '') {
            onSubmit(value)
            setValue('')
        } else {
            // Error
            Alert.alert('Todo can not be empty')
        }
    }

    return(
        <View style={styles.wrapper }>
            <TextInput
                value={value}
                style={styles.input}
                onChangeText={setValue}
                placeholder="Input todo"
                autoCorrect={false}
            />
            <Button
                style={styles.button}
                title="Add"
                onPress={pressHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    input: {
        width: '70%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: '#3949ab',
    },
    button: {
        flex: 1,
    }
})