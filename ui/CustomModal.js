import React from 'react';
import { Modal, View, Text, StyleSheet, Button, TouchableWithoutFeedback } from 'react-native';
import { colors } from './../assets/colors';

const CustomModal = props => {
    return (
        <Modal transparent={true} animationType="fade" visible={props.show}>
            <View style={styles.wrapper}>
                <View style={styles.dialog}>
                    <Text style={styles.mainText}> {props.children} </Text>
                    <View
                        style={{
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1.5,
                            marginVertical: 10,
                            marginTop : 15
                        }}
                    />
                    <View style={styles.buttonWrapper}>
                        <TouchableWithoutFeedback onPress={props.okHandler}>
                            <View style={{ padding: 5 }}>
                                <Text style={styles.buttonOkText}>OK</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={props.cancelHandler}>
                            <View style={{ padding: 5 }}>
                                <Text style={styles.buttonCancelText}>CANCEL</Text>
                            </View>
                        </TouchableWithoutFeedback>
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
        paddingTop: 15,
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