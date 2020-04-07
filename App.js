import React,{useState} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import RootNavigator from './navigators/RootNavigator';
import {enableScreens} from 'react-native-screens';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

enableScreens();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans-regular" : require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-regular-italic" : require("./assets/Fonts/OpenSans-Italic.ttf"),
    "open-sans-semiBold" : require("./assets/Fonts/OpenSans-SemiBold.ttf"),
    "open-sans-semiBold-italic" : require("./assets/Fonts/OpenSans-SemiBoldItalic.ttf"),
    "open-sans-extraBold" : require("./assets/Fonts/OpenSans-ExtraBold.ttf")
  })
}

export default function App() {

  const [dataLoading, setDataLoading] = useState(true);
  
  if(dataLoading){
    return <AppLoading startAsync={fetchFonts} onFinish={()=>{setDataLoading(false)}}></AppLoading>
  }

  return (
    <RootNavigator></RootNavigator>
  );
}

const styles = StyleSheet.create({
});
