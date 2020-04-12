import React from 'react';
import { StyleSheet, Modal, ActivityIndicator, View } from 'react-native';

const CustomLoader = props => {
    return (
        <Modal transparent={true} animationType="fade" visible={props.show}>
            <View style={styles.wrapper}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: "rgba(0,0,0,0.4)",
        flex: 1,
        justifyContent: "center",
        alignContent: "center"
    },
})

export default CustomLoader;