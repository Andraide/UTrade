import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { Home } from '../screens/home/home'
import { Login } from '../screens/login/login'
import { SideMenu } from '../components/SideMenu';
import { NavigationContainer } from '@react-navigation/native';

export const Routes = {
    //Stacks
    home: { name: 'home', key: 'myStackKey' },
    secondStack: { name: 'secondStack', key: 'secondStackKey' },
    menu: { name: 'menu', key: 'menu' },
    
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
              initialRouteName={Routes.login.name}
              headerMode={"none"}
            >
        <HomeStack.Group>
          <HomeStack.Screen name={Routes.home.name} component={Home}/>
          <HomeStack.Screen name={Routes.login.name} component={Login}/>
        </HomeStack.Group>
        <HomeStack.Group screenOptions={{ presentation: 'modal' }}>
          <HomeStack.Screen name={Routes.menu.name} component={SideMenu}/>
        </HomeStack.Group>
      </HomeStack.Navigator>
    );
  };
  
  /*
const AuthStack = () => {
    return (
            <SecondStack.Navigator
              initialRouteName={Routes.cameraPermissions.name}
              headerMode={"none"}
            >
              <SecondStack.Screen name={Routes.cameraPermissions.name} component={CameraPermission}/>
              <SecondStack.Screen name={Routes.notificationPermissions.name} component={NotificationPermissions}/>
              <SecondStack.Screen name={Routes.locationPermissions.name} component={LocationPermissions}/>
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