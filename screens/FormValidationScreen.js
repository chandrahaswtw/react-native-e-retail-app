import React, { useReducer } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Button, KeyboardAvoidingView } from 'react-native';
import FormInput from './../ui/FormInput';
import { colors } from './../assets/colors'

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
            let valueClone = {...state.values} 
            valueClone[action.id] = action.val
            return {
                ...state,
                values : valueClone
            }
            break;
        case "CHANGE_VALIDATION":
            let validationClone = {...state.isValid} 
            validationClone[action.id] = action.isValid
            return {
                ...state,
                isValid : validationClone
            }
            break;

        default:
            return state
    }
}

const FormValidationScreen = props => {

    const [state, dispatch] = useReducer(reducer,
        {
            values: {
                [FIRST_NAME]: "",
                [LAST_NAME]: "",
                [AGE]: "",
                [CITY]: "",
                [COUNTRY]: "",
                [EMAIL]: ""
            },
            isValid: {
                [FIRST_NAME]: false,
                [LAST_NAME]: false,
                [AGE]: false,
                [CITY]: false,
                [COUNTRY]: false,
                [EMAIL]: false
            }
        })

    const onChangeHandler = (id, val) => {
        dispatch({key : CHANGE_VAL, val, id});
        if(val.trim().length > 0)
        {
            dispatch({key : CHANGE_VALIDATION, isValid : true, id});
        }
        else{
            dispatch({key : CHANGE_VALIDATION, isValid : false, id});
        }
    }

    return (

            <ScrollView style={styles.wrapper}>
                <FormInput title="FIRST NAME" id={FIRST_NAME} value={state.values[FIRST_NAME]} isValid={state.isValid[FIRST_NAME]} onChangeHandler={onChangeHandler}></FormInput>
                <FormInput title="LAST NAME" id={LAST_NAME} value={state.values[LAST_NAME]} isValid={state.isValid[LAST_NAME]} onChangeHandler={onChangeHandler}></FormInput>
                <FormInput title="AGE" id={AGE} value={state.values[AGE]} isValid={state.isValid[AGE]} onChangeHandler={onChangeHandler}></FormInput>
                <FormInput title="CITY" id={CITY} value={state.values[CITY]} isValid={state.isValid[CITY]} onChangeHandler={onChangeHandler}></FormInput>
                <FormInput title="COUNTRY" id={COUNTRY} value={state.values[COUNTRY]} isValid={state.isValid[COUNTRY]} onChangeHandler={onChangeHandler}></FormInput>
                <FormInput title="EMAIL" id={EMAIL} value={state.values[EMAIL]} isValid={state.isValid[EMAIL]} onChangeHandler={onChangeHandler}></FormInput>
                <Button title="SUBMIT" color={colors.pumpkin}></Button>
            </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        flex: 1
    }
})

export default FormValidationScreen;