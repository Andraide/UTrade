import React, { useState, useEffect } from "react";
import { View, Text, Platform, StatusBar, Dimensions, Image } from "react-native";
import DeviceInfo from "react-native-device-info"
const hasNotch = DeviceInfo.hasNotch()
const heigthScreen = Dimensions.get('window').height
const widthScreen = Dimensions.get('window').width


const SideMenu = () => {

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
            </View>
    )
}

export { SideMenu }