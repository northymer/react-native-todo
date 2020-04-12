import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Modal, Alert } from 'react-native'
import { THEME } from '../theme/theme'

export const EditModal = ({ visible, onCancel, value, onSave, id }) => {
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if (title.trim().length === 0) {
            Alert.alert('Text should not be empty')
        } else {
            onSave(id, title)
            onCancel()
        }
    }

    return (
        <Modal
            visible={visible}
            animationType="slide"
        >
            <View style={styles.wrapper}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder="Input Title"
                    autoCorrect={false}
                    maxLength={64}
                />
                <View style={styles.buttons}>
                    <Button color={THEME.COLOR_DANGER} title="Cancel" onPress={onCancel} />
                    <Button title="Save" onPress={saveHandler} />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.COLOR_BUSINESS_MAIN,
        borderBottomWidth: 2,
        width: '80%',
    },
    buttons: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
        justifyContent: 'space-around'
    }
})