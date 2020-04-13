import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { colors } from "./../assets/colors"

const FormInput = props => {
    return (
        <View style={styles.wrapper}>
            {props.title ? <Text style={styles.textStyles}>{props.title}</Text> : null}
            <View style={{position : "relative"}}>
                <TextInput style={styles.inputStyles} {...props} onChangeText={props.onChangeHandler.bind(this, props.id)}></TextInput>
                <View style={{ flexDirection: "row", position : "absolute", right : 0, bottom : 5 }}>
                    {props.isValid ? null : <Text style={styles.errorInputStyles} >{props.errorText}</Text>}
                </View>
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
        padding: 1,
        paddingHorizontal: 3,
    }
})

export default FormInput;