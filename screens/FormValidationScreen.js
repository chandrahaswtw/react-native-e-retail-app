import React, { useReducer, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import FormInput from './../ui/FormInput';
import { colors } from './../assets/colors';
import CustomButton from './../ui/CustomButton';
import FetchAPI from './../Fetch/Fetch';

const FIRST_NAME = "FIRST_NAME";
const LAST_NAME = "LAST_NAME";
const AGE = "AGE";
const CITY = "CITY";
const COUNTRY = "COUNTRY";
const EMAIL = "EMAIL";

const CHANGE_VAL = "CHANGE_VAL";
const CHANGE_VALIDATION = "CHANGE_VALIDATION";

const reducer = (state, action) => {
    switch (action.key) {
        case "CHANGE_VAL":
            let valueClone = { ...state.values }
            valueClone[action.id] = action.val
            return {
                ...state,
                values: valueClone
            }
            break;
        case "CHANGE_VALIDATION":
            let validationClone = { ...state.isValid }
            validationClone[action.id] = action.isValid
            return {
                ...state,
                isValid: validationClone
            }
            break;

        default:
            return state
    }
}

const FormValidationScreen = props => {
    const [isLoading, setLoading] = useState(false)
    const [state, dispatch] = useReducer(reducer,
        {
            values: {
                [FIRST_NAME]: "",
                [LAST_NAME]: "",
                [AGE]: "",
                [CITY]: "",
                [COUNTRY]: "",
            },
            isValid: {
                [FIRST_NAME]: false,
                [LAST_NAME]: false,
                [AGE]: false,
                [CITY]: false,
                [COUNTRY]: false,
            }
        })

    const onChangeHandler = (id, val) => {
        dispatch({ key: CHANGE_VAL, val, id });
        if (val.trim().length > 0) {
            dispatch({ key: CHANGE_VALIDATION, isValid: true, id });
        }
        else {
            dispatch({ key: CHANGE_VALIDATION, isValid: false, id });
        }
    }

    const onPressHandler = () => {

        let x = Object.values(state.isValid).reduce((acc, cur) => {
            return acc && cur
        }, true)

        if (!x) {
            return Alert.alert("OOPS !!", "Mandatory fields needs to be filled first", [{ text: "OK", style: "cancel" }])
        }

        setLoading(true);

        FetchAPI("https://react-form-validation.firebaseio.com/.json", "POST", state.values)
            .then((res) => { return res.json() })
            .then((body) => { setLoading(false) })
            .catch((e) => { setLoading(false) })

    }

    return (
        <ScrollView style={styles.wrapper}>
            <FormInput
                title="FIRST NAME"
                id={FIRST_NAME}
                value={state.values[FIRST_NAME]}
                isValid={state.isValid[FIRST_NAME]}
                onChangeHandler={onChangeHandler}
                errorText="Enter first name">
            </FormInput>

            <FormInput
                title="LAST NAME"
                id={LAST_NAME}
                value={state.values[LAST_NAME]}
                isValid={state.isValid[LAST_NAME]}
                onChangeHandler={onChangeHandler}
                errorText="Enter last name">
            </FormInput>

            <FormInput
                title="AGE"
                id={AGE}
                keyboardType="numeric"
                value={state.values[AGE]}
                isValid={state.isValid[AGE]}
                onChangeHandler={onChangeHandler}
                errorText="Enter your age">
            </FormInput>

            <FormInput
                title="CITY"
                id={CITY}
                value={state.values[CITY]}
                isValid={state.isValid[CITY]}
                onChangeHandler={onChangeHandler}
                errorText="Enter city name where you live">
            </FormInput>

            <FormInput
                title="COUNTRY"
                id={COUNTRY}
                value={state.values[COUNTRY]}
                isValid={state.isValid[COUNTRY]}
                onChangeHandler={onChangeHandler}
                errorText="Enter the country">
            </FormInput>

            <CustomButton title={isLoading ? "SUBMITTING" : "SUBMIT"} onPressHandler={onPressHandler}></CustomButton>

            {isLoading ? <View style={styles.activityWrapper}>
                <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
            </View> : null}


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        flex: 1
    },
    activityWrapper: {
        marginVertical: 7
    }
})

export default FormValidationScreen;