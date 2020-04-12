import React from 'react';
import { Modal, View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Underline from './../ui/Underline'
import { colors } from './../assets/colors';

const CustomModal = props => {
    return (
        <Modal transparent={true} animationType="fade" visible={props.show}>
            <View style={styles.wrapper}>
                <View style={styles.dialog}>
                    <Text style={styles.mainText}> {props.children} </Text>
                    <Underline></Underline>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={props.okHandler}>
                            <View style={{ padding: 8}}>
                                <Text style={styles.buttonOkText}>OK</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props.cancelHandler}>
                            <View style={{ padding: 8}}>
                                <Text style={styles.buttonCancelText}>CANCEL</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "rgba(0,0,0,0.4)",
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: "center"
    },
    dialog: {
        backgroundColor: "white",
        padding: 10,
        paddingTop: 20,
        borderRadius: 5
    },
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    buttonOkText: {
        color: colors.success,
        fontFamily: "open-sans-semiBold"
    },
    buttonCancelText: {
        color: colors.pumpkin,
        fontFamily: "open-sans-semiBold"
    },
    mainText: {
        fontFamily: "open-sans-regular",
        textAlign: "center"
    }
})

export default CustomModal;