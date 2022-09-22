import React, { useState, useEffect } from "react";
import { View, Text, Platform, StatusBar, Dimensions, Image } from "react-native";
import SearchBar from "react-native-dynamic-search-bar"
import DeviceInfo from "react-native-device-info"
//import Icon from "../../assets/menu/icon.png"
import Icon from "../../assets/icon.png"
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { SideMenu } from "../../components/SideMenu"
const hasNotch = DeviceInfo.hasNotch()
const heigthScreen = Dimensions.get('window').height

const Home = ({ navigation }) => {

    const [ notch, setNotch ] = useState(false)
    const [ notchHeight, setNotchHeigth ] = useState(0)
    const [ modal, setModal ] = useState(false)

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

    const homeMenus = () => {
      let menus = ["Ganaderia", "Forestal", "Lecherias", "Agricola"]
      return menus.map((menu) => {
        return (
          <View style={{ flex: 0.2, height: 100 }}>
            <Text>{menu}</Text>
          </View>
        )
      })
    }

    return (
            <View style={{ flex: 1, marginTop: notch ? notchHeight : 0, backgroundColor: 'white' }}>
                <View style={{ flex: 0.1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <View style={{ flex: 0.05 }}></View>
                    <View style={{ flex: 0.2, alignItems:'flex-start', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => { 
                            navigation.openDrawer()
                            setModal(!modal) 
                            console.log(modal)
                            }}>
                            <Image source={Icon} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', height: 40 }}><Text style={{ textAlign: 'center' }}>User</Text></View>
                    <View style={{ flex: 0.25 }}></View>
                </View>
                <View style={{ flex: 0.1 }}>
                    <SearchBar/>
                </View>
                <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Select your pet</Text>
                </View>
                <View style={{ flex: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Publications</Text>
                    {homeMenus}
                </View>
            </View>
    )
}

export { Home }