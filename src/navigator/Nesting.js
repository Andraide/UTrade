import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { SideMenu } from "../components/SideMenu";
import { Home } from "../screens/home/home";

const Drawer = createDrawerNavigator();

const NestedHome = () => {
  return (
    <Drawer.Navigator
        screenOptions= {{
          headerShown: false,
          drawerType: 'front'
        }}
        
        drawerContent={(props) => <SideMenu {...props} />}

    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export { NestedHome };

