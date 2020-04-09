import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { colors } from "./../assets/colors"

const FormInput = props => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.textStyles}>{props.title}</Text>
            <TextInput style={styles.inputStyles} {...props} onChangeText={props.onChangeHandler.bind(this, props.id)}></TextInput>
            <View style={{flexDirection : "row"}}>
                {props.isValid ? null : <Text style={styles.errorInputStyles} >{props.errorText}</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 20
    },
    textStyles: {
        fontFamily: "open-sans-semiBold",
    },
    inputStyles: {
        borderColor: "#ccc",
        borderBottomWidth: 1,
        padding: 1,
        fontFamily: "open-sans-regular"
    },
    errorInputStyles: {
        fontFamily: "open-sans-semiBold",
        color: "red",
        fontSize: 9,
        backgroundColor: colors.greyBg,
        borderRadius: 3,
        padding : 1,
        paddingHorizontal : 3,
        marginTop : 3
    }
})

export default FormInput;