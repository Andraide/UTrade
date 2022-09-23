import React, { useState, useEffect } from "react";
import { View, Text, Platform, StatusBar, Dimensions, Image, ScrollView } from "react-native";
import SearchBar from "react-native-dynamic-search-bar"
import DeviceInfo from "react-native-device-info"
//import Icon from "../../assets/menu/icon.png"
import Icon from "../../assets/menu/menu-cuadrado.png"
import Ganaderia from "../../assets/home/cattle-60.png"
import { TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { SideMenu } from "../../components/SideMenu"
const hasNotch = DeviceInfo.hasNotch()
const heigthScreen = Dimensions.get('window').height
const widthScreen = Dimensions.get('window').width

let menus = ["Ganaderia", "Forestal", "Lecherias", "Agricola", "Aridos", "Agricola"]

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


    })

    const homeMenus =  menus.map((menu, i) => {
        return (
          <View key={i} style={{ flex: 1, flexDirection: 'row', width: widthScreen - 40, height: 100, marginTop: 20, borderWidth: 1, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 0.2, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
              <Image style={{ resizeMode: 'center' }} source={Ganaderia}></Image>
            </View>
            <View style={{ flex: 0.8, width: widthScreen - 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white' }}>
              <Text>{menu}</Text>
            </View>
            <View style={{ flex: 0.2 }}></View>

          </View>
        )
      })
  

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
                <View style={{ flex: 0.075 }}>
                    <SearchBar/>
                </View>
                <View style={{ flex: 0.825,alignItems: 'center', justifyContent: 'center' }}>
                  <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', width: widthScreen }}>
                    {homeMenus}
                  </ScrollView>
                </View>
            </View>
    )
}

export { Home }