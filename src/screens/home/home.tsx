import React, { useState, useEffect } from "react";
import { View, Text, Platform, StatusBar, Dimensions } from "react-native";
import SearchBar from "react-native-dynamic-search-bar"
import DeviceInfo from "react-native-device-info"
import { not } from "react-native-reanimated";
const hasNotch = DeviceInfo.hasNotch()
const heigthScreen = Dimensions.get('window').height

const Home = () => {

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

        console.log("Status bar", StatusBar.currentHeight, heigthScreen)
    })

    return (
            <View style={{ flex: 1, marginTop: notch ? notchHeight : 0 }}>
                <View style={{ flex: 0.1 }}>
                    <SearchBar/>
                </View>
                <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Select your pet</Text>
                </View>
                <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Publications</Text>
                </View>
            </View>
    )
}

export { Home }