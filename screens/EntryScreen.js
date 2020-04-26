import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

const EntryScreen = props => {

    let dispatch = useDispatch();

    useEffect(() => {
        var expiryFunc = async () => {
            let expiresAt = await AsyncStorage.getItem("expiresAt");
            let localID = await AsyncStorage.getItem("localID");
            let tokenID = await AsyncStorage.getItem("tokenID");

            if (new Date(expiresAt) > new Date()) {
                dispatch({ type: "AUTOLOGIN", expiresAt, localID, tokenID })
            }
            else {
                dispatch({ type: "TRYAUTOLOGIN"})
            }
        }

        expiryFunc()
        
    }, [])



    return (
        <View style={styles.wrapper}>
            <Text style={styles.textStyles}>LOADING PLEASE WAIT</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center"
    },
    textStyles: {
        fontFamily: "open-sans-extraBold",
        textAlign: "center",
        fontSize: 16,
        marginBottom: 10
    }
})

export default EntryScreen;