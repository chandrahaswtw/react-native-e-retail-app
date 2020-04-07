// BASIC IMPORTS
import React from 'react';


// IMPORTING THE NAVIGATOR STUFF
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

// IMPORTING THE SCREENS
import FormValidationScreen from '../screens/FormValidationScreen';

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

// PRODUCT STACK
const FormStack = createStackNavigator({
    Products: {
        screen: FormValidationScreen,
        navigationOptions: {
            headerTitle: "FORM VALIDATION"
        }
    }
}, {
    defaultNavigationOptions: stackDefaultOptions
})

export default createAppContainer(FormStack)