import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import { enableScreens } from 'react-native-screens';
import { AppLoading } from 'expo';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import BioReducer from './store/BioReducer';
import AuthReducer from './store/AuthReducer';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';

import * as Font from 'expo-font';

enableScreens();

const rootReducer = combineReducers({
  bio: BioReducer,
  auth: AuthReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans-regular": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-regular-italic": require("./assets/Fonts/OpenSans-Italic.ttf"),
    "open-sans-semiBold": require("./assets/Fonts/OpenSans-SemiBold.ttf"),
    "open-sans-semiBold-italic": require("./assets/Fonts/OpenSans-SemiBoldItalic.ttf"),
    "open-sans-extraBold": require("./assets/Fonts/OpenSans-ExtraBold.ttf")
  })
}

export default function App() {

  const [dataLoading, setDataLoading] = useState(true);


  if (dataLoading) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => { setDataLoading(false) }}></AppLoading>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <HomeScreen></HomeScreen>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});
