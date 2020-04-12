import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { colors } from './../../assets/colors';
import * as keyValue from './../AddEdit/Utils/KeyValue';
import { useSelector } from 'react-redux';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Underline from './../../ui/Underline';
import CustomModal from './../../ui/CustomModal';
import { useDispatch } from 'react-redux';
import CustomLoader from './../../ui/CustomLoader';

const EmployeeDatabase = props => {

    // BASIC INITIAL SETUP OF STATE
    const [modalShow, setModalShow] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [currentID, setCurrentID] = useState(false);

    // TAKING REDUX SLICE
    var bio = useSelector(state => state.bio);

    // INITIALING THE REDUX DISPATCH
    var reduxDispatch = useDispatch();

    // TOGGLE MODAL
    const toggleModal = () => {
        setModalShow(!modalShow);
    }

    // THUNK OPERATION TO LOAD THE INITIAL DATA
    const fetchBio = (extraLoader) => {
        return dispatch => {
            extraLoader ? setLoading(true) : null
            fetch("https://react-form-validation.firebaseio.com/.json", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({ type: "initialFetch", value: data });
                    extraLoader ? setLoading(false) : null
                })
                .catch(e => {
                    console.log(e)
                    extraLoader ? setLoading(false) : null
                })
        }
    }

    // MODAL OK HANDLER
    const okHandler = () => {
        setModalShow(false);
        setLoading(true)
        fetch(`https://react-form-validation.firebaseio.com/${currentID}/.json`, {
            method: "DELETE"
        })
            .then((res) => {
                reduxDispatch(fetchBio(true))
            })
    }


    // INITIALING THE EVENT TO RUN THUNK
    useEffect(() => {
        var event = props.navigation.addListener("didFocus", () => {
            reduxDispatch(fetchBio(true))
        })

        return () => {
            event.remove()
        }
    }, [])

    // IF NO DATA, DISPLAY NO DATA MESSAGE
    if (!bio.employeeInfo.length) {
        return (<View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", fontFamily: "open-sans-semiBold", color: colors.nasturcianFlower }}>NO RECORDS TO DISPLAY</Text>
            <Text style={{ textAlign: "center", fontFamily: "open-sans-semiBold" }}>PLEASE ADD A NEW RECORD TO VIEW THE DATA</Text>
        </View>)
    }

    // MAIN RETURN
    return (
        <React.Fragment>
            <CustomLoader show={isLoading}></CustomLoader>
            <CustomModal show={modalShow} okHandler={okHandler} cancelHandler={toggleModal}>
                <Text>Do you wanna delete the record?</Text>
            </CustomModal>
            <FlatList refreshing={false} onRefresh={() => { reduxDispatch(fetchBio(false)) }}
                data={bio.employeeInfo}
                renderItem={(dataItem) => {
                    return (
                        <View style={styles.coreWrapper}>
                            <View style={styles.heading}>
                                <View style={styles.imageWrapper}>
                                    <Ionicons name="ios-person" size={Dimensions.get("window").width * 0.1} color="#ffb142"></Ionicons>
                                </View>
                            </View>
                            <View style={styles.dataWrapper}>
                                <View style={{ flex: 1 }}>
                                    <View style={styles.nameRow}>
                                        <Text style={styles.nameStyles}>{dataItem.item.value[keyValue.FIRST_NAME]}</Text>
                                        <Text style={styles.nameStyles}>{dataItem.item.value[keyValue.LAST_NAME]},</Text>
                                        <Text style={styles.nameStyles}>{dataItem.item.value[keyValue.AGE]}</Text>
                                    </View>

                                    <View style={styles.locationRow}>
                                        <Entypo name="location-pin" size={23} color="red"></Entypo>
                                        <Text style={styles.loactionStyles}>{dataItem.item.value[keyValue.CITY]}, </Text>
                                        <Text style={styles.loactionStyles}>{dataItem.item.value[keyValue.COUNTRY]}</Text>
                                    </View>
                                </View>
                            </View>
                            <Underline></Underline>
                            <View style={styles.buttonWrapper}>
                                <TouchableOpacity onPress={() => { props.navigation.navigate({ routeName: "ADD_EDIT_SCREEN", params: { dynamicName: "EDIT", id: dataItem.item.id } }) }}>
                                    <View style={styles.button}>
                                        <Entypo name="edit" size={23} color={colors.picoVoid}></Entypo>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { toggleModal(), setCurrentID(dataItem.item.id) }}>
                                    <View style={styles.button}>
                                        <AntDesign name="deleteuser" size={23} color={colors.nasturcianFlower}></AntDesign>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }}></FlatList>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    coreWrapper: {
        borderColor: colors.spiced,
        borderWidth: 1,
        borderRadius: 3,
        margin: 5,
        overflow: "hidden"
    },
    heading: {
        height: Dimensions.get("window").height * 0.08,
        backgroundColor: colors.picoVoid,
        alignItems: "center",
        position: "relative"
    },
    imageWrapper: {
        width: Dimensions.get("window").width * 0.16,
        height: Dimensions.get("window").width * 0.16,
        borderRadius: Dimensions.get("window").width * 0.16,
        borderColor: "#ccc",
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "30%"
    },
    dataWrapper: {
        flexDirection: "row",
        marginTop: Dimensions.get("window").height * 0.08 * 0.50
    },
    nameRow : {
        flexDirection : "row",
        justifyContent : "center"
    },
    nameStyles : {
        fontFamily : "open-sans-semiBold",
        fontSize : 20,
        paddingHorizontal : 3
    },
    locationRow : {
        flexDirection : "row",
        justifyContent : "center",
        alignItems : "center"
    },
    loactionStyles : {
        fontFamily : "open-sans-regular-italic",
        paddingHorizontal : 3 
    },
    buttonWrapper: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    button: {
        paddingVertical: 2,
        paddingHorizontal: 5
    }
})

export default EmployeeDatabase