import React from 'react';
import {StyleSheet} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../ui/CustomHeaderButton';
import EmployeeDatabase from './../components/EmployeeDatabase/EmployeeDatabase';

const EmployeeDatabaseScreen = props => {
    console.log(props.navigation.getParam("test"))
    return (
        <EmployeeDatabase navigation = {props.navigation}></EmployeeDatabase>
    )
}

EmployeeDatabaseScreen.navigationOptions = (navInfo) => {
    return {
        headerRight: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="ADD"
                        iconName="ios-person-add"
                        onPress={
                            () => {
                                navInfo.navigation.navigate(
                                    {
                                        routeName: "ADD_EDIT_SCREEN",
                                        params: { dynamicName: "ADD" }
                                    }
                                )
                            }
                        }>
                    </Item>
                </HeaderButtons>
            )
        },
        headerLeft: () => {
            return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="ADD"
                        iconName="ios-menu"
                        onPress={
                            () => {
                                navInfo.navigation.toggleDrawer()
                            }
                        }>
                    </Item>
                </HeaderButtons>
            )
        }
    }
}

const styles = StyleSheet.create({})

export default EmployeeDatabaseScreen;