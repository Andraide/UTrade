import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { SideMenu } from "../components/SideMenu";

import { AppStack } from "./StackNavigator";
import { Home } from '../screens/home/home'


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
        screenOptions= {{
          headerShown: false
        }}
        drawerContent={(props) => <SideMenu {...props} />}
    >
      <Drawer.Screen name="Home" component={AppStack} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;