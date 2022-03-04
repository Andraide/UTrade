import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '../screens/home/home'
import { Login } from '../screens/login/login'
import { NavigationContainer } from '@react-navigation/native';

export const RouteIdentifiers = {
    //Stacks
    home: { name: 'home', key: 'myStackKey' },
    secondStack: { name: 'secondStack', key: 'secondStackKey' },
    
    //Screens
    login: { name: 'login' },
    cameraPermissions: { name: 'cameraPermission' },
    notificationPermissions: { name: 'notificationPermissions' },
    locationPermissions: { name: 'locationPermissions' }
};

const HomeStack = createStackNavigator();
const SecondStack = createStackNavigator();

const AppStack = () => {
    return (
      <HomeStack.Navigator
              initialRouteName={RouteIdentifiers.login.name}
              headerMode={"none"}
            >
        <HomeStack.Screen name={RouteIdentifiers.login.name} component={Login}/>
      </HomeStack.Navigator>
    );
  };
  
  /*
const AuthStack = () => {
    return (
            <SecondStack.Navigator
              initialRouteName={RouteIdentifiers.cameraPermissions.name}
              headerMode={"none"}
            >
              <SecondStack.Screen name={RouteIdentifiers.cameraPermissions.name} component={CameraPermission}/>
              <SecondStack.Screen name={RouteIdentifiers.notificationPermissions.name} component={NotificationPermissions}/>
              <SecondStack.Screen name={RouteIdentifiers.locationPermissions.name} component={LocationPermissions}/>
            </SecondStack.Navigator>
    );
  };
  */
const Navigator = () => {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}

export { Navigator } 