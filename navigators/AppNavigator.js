import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, SafeAreaView, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux'

// SCREEN IMPORTS
import EmployeeDatabaseScreen, { ScreenOptions as EmployeeDatabaseScreenOptions } from './../screens/EmployeeDataBaseScreen';
import AddEditScreen from './../screens/AddEditScreen';
import AuthScreen from './../screens/AuthScreen';
import EntryScreen from './../screens/EntryScreen';

// OTHER IMPORTS
import { colors } from './../assets/colors';
import CustomButtom from './../ui/CustomButton';


// STACK DEFAULT OPTIONS
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

// EMPLOYEE STACK
const EmployeeStackComponent = () => {

    const EmployeeStack = createStackNavigator();

    return (
        <EmployeeStack.Navigator screenOptions={stackDefaultOptions}>
            <EmployeeStack.Screen
                name="EMPLOYEE DATABASE"
                component={EmployeeDatabaseScreen}
                options={EmployeeDatabaseScreenOptions} />
            <EmployeeStack.Screen
                name="ADD_EDIT_SCREEN"
                component={AddEditScreen}
            />
        </EmployeeStack.Navigator>
    )
}

export const AuthStackComponent = () => {
    const AuthStack = createStackNavigator();

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="AUTH" component={AuthScreen} options={{ headerMode: 'none', headerShown: false }} />
        </AuthStack.Navigator>
    )
}

export const EntryStackComponent = () => {
    const EntryStack = createStackNavigator();

    return (
        <EntryStack.Navigator>
            <EntryStack.Screen name="ENRTY" component={EntryScreen} options={{ headerMode: 'none', headerShown: false }} />
        </EntryStack.Navigator>
    )
}

// DRAWER NAVIGATION
export const CoreDrawerNavigator = () => {

    const CoreDrawer = createDrawerNavigator();
    const dispatch = useDispatch();

    const clearStore = async () => {
        dispatch({ type: "LOGOUT" })
        await AsyncStorage.clear()
    }

    return (
        <CoreDrawer.Navigator drawerContent={(props) => {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
                        <DrawerItemList {...props}></DrawerItemList>
                        <CustomButtom color={colors.harleyDavidsonOrange} title="LOGOUT"
                            onPressHandler={clearStore}></CustomButtom>
                </SafeAreaView>
                </View>
            )
        }}>
            <CoreDrawer.Screen
                name="HOME"
                component={EmployeeStackComponent}
                options={{
                    drawerIcon: (props) => {
                        return <AntDesign name="home" size={23} color={props.color}></AntDesign>
                    }
                }} />
        </CoreDrawer.Navigator>
    )
}


