import React, { useState, useEffect } from "react";
import { View, Text, Platform, StatusBar, Dimensions, Image, Button } from "react-native";
import DeviceInfo from "react-native-device-info"
import { Routes } from "../navigator/StackNavigator"
const hasNotch = DeviceInfo.hasNotch()
const heigthScreen = Dimensions.get('window').height
const widthScreen = Dimensions.get('window').width


const SideMenu = ({ navigation }) => {

    const [ notch, setNotch ] = useState(false)
    const [ notchHeight, setNotchHeigth ] = useState(0)

    useEffect(() => {
        
        if(Platform.OS == 'ios' && hasNotch)
        {
            setNotch(true)
            setNotchHeigth(heigthScreen/20)
        }
        else if(hasNotch)
        {
            setNotch(true)
            setNotchHeigth(StatusBar.currentHeight)
        }

        //console.log("Status bar", StatusBar.currentHeight, heigthScreen)
    })

    return (
            <View style={{ backgroundColor: 'blue', flex: 1, width: widthScreen/2, height: heigthScreen, marginTop: notch ? notchHeight : 0 }}>
                <Text>Modal</Text>
                <Button title="Publish" onPress={() => {navigation.navigate(Routes.publish.name)}}></Button>
            </View>
    )
}

export { SideMenu }