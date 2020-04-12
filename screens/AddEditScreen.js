import React from 'react';
import AddEdit from './../components/AddEdit/AddEdit';

const FormValidationScreen = props => {
    return (
        <AddEdit
            navigation={props.navigation}
            id={props.navigation.getParam("id")}
            mode={props.navigation.getParam("dynamicName")}
        ></AddEdit>
    )
}

FormValidationScreen.navigationOptions = navInfo => {
    return {
        headerTitle: navInfo.navigation.getParam("dynamicName")
    }
}

export default FormValidationScreen;