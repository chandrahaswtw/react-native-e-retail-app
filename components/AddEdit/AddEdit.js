import React, { useReducer, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, Alert } from 'react-native';
import FormInput from '../../ui/FormInput';
import { colors } from '../../assets/colors';
import CustomButton from '../../ui/CustomButton';
import FetchAPI from '../../Fetch/FetchAPI';
import * as keyValue from './Utils/KeyValue';


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

const AddEdit = props => {
    const [isLoading, setLoading] = useState(false)
    const [state, dispatch] = useReducer(reducer,
        {
            values: {
                [keyValue.FIRST_NAME]: "",
                [keyValue.LAST_NAME]: "",
                [keyValue.AGE]: "",
                [keyValue.CITY]: "",
                [keyValue.COUNTRY]: "",
            },
            isValid: {
                [keyValue.FIRST_NAME]: false,
                [keyValue.LAST_NAME]: false,
                [keyValue.AGE]: false,
                [keyValue.CITY]: false,
                [keyValue.COUNTRY]: false,
            }
        })

    const onChangeHandler = (id, val) => {
        dispatch({ key: keyValue.CHANGE_VAL, val, id });
        if (val.trim().length > 0) {
            dispatch({ key: keyValue.CHANGE_VALIDATION, isValid: true, id });
        }
        else {
            dispatch({ key: keyValue.CHANGE_VALIDATION, isValid: false, id });
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
            .then((body) => { setLoading(false); props.navigation.goBack() })
            .catch((e) => { setLoading(false) })
    }

    return (
        <ScrollView style={styles.wrapper}>
            <FormInput
                title="FIRST NAME"
                id={keyValue.FIRST_NAME}
                value={state.values[keyValue.FIRST_NAME]}
                isValid={state.isValid[keyValue.FIRST_NAME]}
                onChangeHandler={onChangeHandler}
                errorText="Enter first name">
            </FormInput>

            <FormInput
                title="LAST NAME"
                id={keyValue.LAST_NAME}
                value={state.values[keyValue.LAST_NAME]}
                isValid={state.isValid[keyValue.LAST_NAME]}
                onChangeHandler={onChangeHandler}
                errorText="Enter last name">
            </FormInput>

            <FormInput
                title="AGE"
                id={keyValue.AGE}
                keyboardType="numeric"
                value={state.values[keyValue.AGE]}
                isValid={state.isValid[keyValue.AGE]}
                onChangeHandler={onChangeHandler}
                errorText="Enter your age">
            </FormInput>

            <FormInput
                title="CITY"
                id={keyValue.CITY}
                value={state.values[keyValue.CITY]}
                isValid={state.isValid[keyValue.CITY]}
                onChangeHandler={onChangeHandler}
                errorText="Enter city name where you live">
            </FormInput>

            <FormInput
                title="COUNTRY"
                id={keyValue.COUNTRY}
                value={state.values[keyValue.COUNTRY]}
                isValid={state.isValid[keyValue.COUNTRY]}
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

export default AddEdit;