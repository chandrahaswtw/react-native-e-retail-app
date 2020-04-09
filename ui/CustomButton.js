import React from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native';
import { colors } from './../assets/colors';

const CustomButton = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPressHandler}>
            <View style={styles.wrapper}>
                <Text style={styles.wrapperTextStyles}>{props.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.success,
        padding: 6,
        borderRadius: 2,
        alignItems: "center"
    },
    wrapperTextStyles: {
        fontFamily: "open-sans-extraBold",
        color: "#fff",

    }
})

export default CustomButton;