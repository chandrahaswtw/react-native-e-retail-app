import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

// APP NAVIGATOR
import { AuthStackComponent, EntryStackComponent, CoreDrawerNavigator } from './../navigators/AppNavigator';

// NAVIGATION CONTAINER
import { NavigationContainer } from "@react-navigation/native"

const HomeScreen = props => {

    const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    return (
        <NavigationContainer>
            {!isAuthenticated && !didTryAutoLogin && <EntryStackComponent />}
            {!isAuthenticated && didTryAutoLogin && <AuthStackComponent />}
            {isAuthenticated && <CoreDrawerNavigator />}
        </NavigationContainer>
    )
}

export default HomeScreen;
