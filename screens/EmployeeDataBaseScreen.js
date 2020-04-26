import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../ui/CustomHeaderButton';
import EmployeeDatabase from './../components/EmployeeDatabase/EmployeeDatabase';

const EmployeeDatabaseScreen = props => {

    useEffect(()=>{
        props.navigation.setOptions({
            headerRight: () => {
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item
                            title="ADD"
                            iconName="ios-person-add"
                            onPress={
                                () => {
                                    props.navigation.navigate("ADD_EDIT_SCREEN",{ dynamicName: "ADD" })
                                }
                            }>
                        </Item>
                    </HeaderButtons>
                )
            }
        })
    },[])

    return (
        <EmployeeDatabase navigation = {props.navigation}></EmployeeDatabase>
    )

}

export const ScreenOptions = (navInfo) => {
    return {
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