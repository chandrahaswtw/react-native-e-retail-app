import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../ui/CustomHeaderButton';
import CustomModal from './../ui/CustomModal';

const EmployeeDatabase = props => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <View>
           
        </View>
    )
}

EmployeeDatabase.navigationOptions = (navInfo) => {
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
        }
    }
}

const styles = StyleSheet.create({})

export default EmployeeDatabase;