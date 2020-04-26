import React from 'react';
import AddEdit from './../components/AddEdit/AddEdit';

const FormValidationScreen = props => {
    return (
        <AddEdit
            navigation={props.navigation}
            id={props.route.params.id ? props.route.params.id : null}
            mode={props.route.params.dynamicName}
        ></AddEdit>
    )
}

FormValidationScreen.navigationOptions = navInfo => {
    return {
        headerTitle: props.route.params.dynamicName
    }
}

export default FormValidationScreen;