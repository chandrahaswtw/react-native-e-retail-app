import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const FormInput = props => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.textStyles}>{props.title}</Text>
            <TextInput style={styles.inputStyles} value={props.value} onChangeText={props.onChangeHandler.bind(this, props.id)}></TextInput>
            {props.isValid ? null : <Text  style={styles.errorInputStyles} > * Mandatory field</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom : 20
    },
    textStyles :{
        fontFamily : "open-sans-semiBold",
    },
    inputStyles : {
        borderColor : "#ccc",
        borderBottomWidth : 1,
        padding : 1,
        fontFamily : "open-sans-regular"
    },
    errorInputStyles : {
        fontFamily : "open-sans-regular",
        color : "red",
        fontSize : 10 
    }
})

export default FormInput;