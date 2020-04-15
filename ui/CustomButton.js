import React from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native';

const CustomButton = props => {
    return (
        <TouchableWithoutFeedback onPress={props.onPressHandler}>
            <View style={{...styles.wrapper, backgroundColor : props.color}}>
                <Text style={styles.wrapperTextStyles}>{props.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    wrapper: {
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