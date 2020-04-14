// BASIC IMPORTS
import React from 'react';

// IMPORTING THE NAVIGATOR STUFF
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// IMPORTING THE SCREENS
import EmployeeDatabase from './../screens/EmployeeDataBaseScreen';
import AddEdit from '../screens/AddEditScreen';
import AuthScreen from './../screens/AuthScreen';
import EntryScreen from './../screens/EntryScreen';


// OTHER IMPORTS
import { colors } from './../assets/colors';

// STACK NAVIGATOR(S)

const stackDefaultOptions = {
    headerStyle: {
        backgroundColor: colors.flipCartBlue
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
        fontFamily: "open-sans-extraBold",
        color: "#fff"
    }
}

const FormStack = createStackNavigator({
    EMPLOYEE_DATABASE: {
        screen: EmployeeDatabase,
        navigationOptions: {
            headerTitle : "EMPLOYEE DATABASE"
        }
    },
    ADD_EDIT_SCREEN: {
        screen: AddEdit
    }
}, {
    initialRouteName : "EMPLOYEE_DATABASE",
    defaultNavigationOptions: stackDefaultOptions
})

const AuthNavigator = createSwitchNavigator({
    Entry : EntryScreen,
    Auth : AuthScreen,
    secureContent : FormStack
})

export default createAppContainer(AuthNavigator)