import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './../assets/colors';

const CustomHeaderButton = props => {

    return (
        <HeaderButton
            {...props}
            IconComponent={Ionicons}
            iconSize={25}
            color={colors.yellow}>
        </HeaderButton>
    )

}

export default CustomHeaderButton;