import React from 'react';
import { View } from 'react-native';
import {colors} from './../assets/colors'

const Underline = props => {
    return <View
        style={{
            borderBottomColor: colors.justGrey,
            borderBottomWidth: 1.5,
            marginVertical: 10,
            marginTop: 15
        }}
    />
}

export default Underline;