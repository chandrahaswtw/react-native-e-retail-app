// BASIC IMPORTS
import React from 'react';
import { SafeAreaView, View, Text, AsyncStorage } from 'react-native';
import CustomButtom from './../ui/CustomButton';

// IMPORTING THE NAVIGATOR STUFF
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'

// IMPORTING THE SCREENS
import EmployeeDatabase from './../screens/EmployeeDataBaseScreen';
import AddEdit from '../screens/AddEditScreen';
import AuthScreen from './../screens/AuthScreen';
import EntryScreen from './../screens/EntryScreen';

// OTHER IMPORTS
import { colors } from './../assets/colors';

// REDUX STUFF
import {useDispatch} from 'react-redux'

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
            headerTitle: "EMPLOYEE DATABASE"
        }
    },
    ADD_EDIT_SCREEN: {
        screen: AddEdit
    }
}, {
    initialRouteName: "EMPLOYEE_DATABASE",
    defaultNavigationOptions: stackDefaultOptions
})


const sideNav = createDrawerNavigator({
    HOME: FormStack
}, {
    contentOptions: {
        activeTintColor: colors.success,
        labelStyle : {
            fontFamily : "open-sans-semiBold-italic",
            fontWeight : "200"
        }
    },
    contentComponent: props => {
        const dispatch = useDispatch()

        const clearStore = async () => {
            dispatch({type : "LOGOUT"})
            await AsyncStorage.clear()
            props.navigation.navigate("Auth")
        }

        return (
            <View style={{ flex: 1, justifyContent: "space-between" }}>
                <DrawerNavigatorItems {...props}></DrawerNavigatorItems>
                <SafeAreaView style={{ padding: 10 }}>
                    <CustomButtom color={colors.harleyDavidsonOrange} title="LOGOUT" 
                    onPressHandler ={clearStore}></CustomButtom>
                </SafeAreaView>
            </View>
        )
    }
})

const AuthNavigator = createSwitchNavigator({
    Entry: EntryScreen,
    Auth: AuthScreen,
    secureContent: sideNav
})

export default createAppContainer(AuthNavigator)