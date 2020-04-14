import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import Input from './../ui/FormInput';
import Underline from './../ui/Underline';
import CustomButton from './../ui/CustomButton';
import CustomModal from './../ui/CustomModal';
import CustomLoader from './../ui/CustomLoader';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from './../assets/colors';
import { useDispatch, useSelector } from 'react-redux';

const AuthScreen = props => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [signUp, setSignUp] = useState(false);
    const [modalState, setModalState] = useState({
        show: false,
        message: ""
    });
    const [loading, setLoading] = useState(false);

    const [validity, setValidity] = useState({
        USERNAME: false,
        PASSWORD: false
    })

    const reduxDispatch = useDispatch();
    const AuthState = useSelector(state => state.auth);


    const localStorageSetup = async (localID, tokenID, expiresAt) => {
        try {
            await AsyncStorage.setItem("localID", localID)
            await AsyncStorage.setItem("tokenID", tokenID)
            await AsyncStorage.setItem("expiresAt", String(expiresAt))
        }
        catch (err) {
            setModalState({
                show: true,
                message: err.message
            })
        }
    }

    const onChangeHandler = useCallback((id, val) => {
        if (id === "USERNAME") {
            setUserName(val);
        }
        else {
            setPassword(val)
        }
        setValidity((state) => {
            return {
                ...state,
                [id]: val.trim().length ? true : false
            }
        })
    }, [setUserName, setPassword, setValidity])


    const SignUpHandler = useCallback(async () => {
        setLoading(true);
        try {
            var response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA99xRNjzey5tBata8CWiO6aZWjQNGE3rc", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: userName,
                    password: password,
                    returnSecureToken: true
                })
            })

            var y = await response.json();

            if (response.ok) {
                setModalState({
                    show: true,
                    message: "Signed up successfully! Login to continue"
                })
                // Clear the states now
                setUserName("");
                setPassword("");
                setValidity({
                    USERNAME: false,
                    PASSWORD: false
                })
            }
            else {
                setModalState({
                    show: true,
                    message: y.error.message
                })
            }

            setLoading(false);
        }
        catch (err) {
            setLoading(false);
            setModalState({
                show: true,
                message: err.message
            })
        }
    }, [setLoading, setModalState, setValidity, setUserName, setPassword, userName, password])


    const SignInHandler = useCallback(() => {
       
        return async dispatch => {
            try {
                setLoading(true);
                let response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA99xRNjzey5tBata8CWiO6aZWjQNGE3rc", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            email: userName,
                            password: password,
                            returnSecureToken: true
                        }
                    )
                })

                var y = await response.json();

                if (response.ok) {
                    setLoading(false);
                    let expiresAt = new Date(new Date().getTime() + Number("3600")*1000)
                    dispatch({ type: "LOGIN", value: y , expiresAt});
                    localStorageSetup(y.localId, y.idToken, expiresAt)
                    props.navigation.navigate("secureContent");
                }
                else {
                    setLoading(false);
                    setModalState({
                        show: true,
                        message: y.error.message
                    })
                }
            }
            catch (err) {
                setLoading(false);
                setModalState({
                    show: true,
                    message: err.message
                })
            }
        }
    }, [setLoading, userName, password, setModalState])


    const onPressHandler = useCallback(() => {
        if (!(validity.USERNAME && validity.PASSWORD)) {
            return setModalState((prevState) => {
                return {
                    show: true,
                    message: "EMAIL/PASSWORD IS MISSING"
                }
            })
        }

        if (signUp) {
            SignUpHandler()
        }

        else {
            reduxDispatch(SignInHandler())
        }
    }, [SignUpHandler, SignInHandler, setModalState])

    return (
        <React.Fragment>
            {/* <CustomLoader show={loading}></CustomLoader> */}
            <CustomModal show={modalState.show} okHandler={() => { setModalState({ show: false, message: "" }) }} cancelHandler={() => { setModalState({ show: false, message: "" }) }}>{modalState.message}</CustomModal>
            <LinearGradient style={styles.coreWrapper} colors={[colors.picoVoid, 'transparent']}>
                <Text style={styles.titleText}>WELCOME TO EMPLOYEE DATABASE</Text>
                <View style={styles.authWrapper}>
                    <Input
                        onChangeHandler={onChangeHandler}
                        placeholder="USERNAME"
                        value={userName}
                        isValid={validity.USERNAME}
                        id="USERNAME"
                        errorText="USERNAME MISSING">
                    </Input>
                    <Input
                        onChangeHandler={onChangeHandler}
                        placeholder="PASSWORD"
                        secureTextEntry
                        value={password}
                        isValid={validity.PASSWORD}
                        id="PASSWORD"
                        errorText="PASSWORD MISSING">
                    </Input>
                    <CustomButton color={colors.success} title={signUp ? "SIGN UP" : "LOG IN"} onPressHandler={onPressHandler}></CustomButton>
                    <View style={{ marginVertical: 7 }}>
                        <CustomButton color={colors.picoVoid} title={signUp ? "ALREADY A USER ?  LOGIN HERE" : "NOT A USER ?  SIGN UP HERE"} onPressHandler={() => { setSignUp(prevState => !prevState) }}></CustomButton>
                    </View>
                </View>
            </LinearGradient>
        </React.Fragment>
    )
}

const styles = StyleSheet.create({
    coreWrapper: {
        flex: 1,
        justifyContent: "center",
        position: "relative"
    },
    titleText: {
        color: "#fff",
        textAlign: "center",
        marginBottom: 50,
        fontFamily: "open-sans-extraBold",
        fontSize: 18,
        padding: 18,
        position: "absolute",
        top: Dimensions.get("window").height * 0.20
    },
    authWrapper: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#fff"
    }
})

export default AuthScreen;
