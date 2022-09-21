import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NestedHome } from './Nesting';
import { Login } from '../screens/login/login'
import { PhoneSignIn } from '../screens/login/loginWithPhone';
import { Publish } from '../screens/publish/publish'
import { SideMenu } from '../components/SideMenu';
import { NavigationContainer } from '@react-navigation/native';

const Routes = {
    //Stacks
    home: { name: 'home', key: 'myStackKey' },
    secondStack: { name: 'secondStack', key: 'secondStackKey' },
    menu: { name: 'menu', key: 'menu' },
    
    //Screens
    login: { name: 'login' },
    loginWithPhone: { name: 'loginWithPhone' },
    cameraPermissions: { name: 'cameraPermission' },
    notificationPermissions: { name: 'notificationPermissions' },
    locationPermissions: { name: 'locationPermissions' },
    publish: { name: 'publish' }
};

const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();

const AppStack = () => {
    return (
      <HomeStack.Navigator
              initialRouteName={Routes.login.name}
            >
        <HomeStack.Group>
          <HomeStack.Screen name={Routes.login.name} component={Login} options={{ headerShown: false }}/>
        </HomeStack.Group>
        <HomeStack.Group>
          <HomeStack.Screen name={Routes.home.name} component={NestedHome}/>
        </HomeStack.Group>
        <HomeStack.Group>
          <HomeStack.Screen name={Routes.publish.name} component={Publish}/>
        </HomeStack.Group>
      </HomeStack.Navigator>
    );
  };
  
const AuthStack = () => {
  return (
    <LoginStack.Navigator
            initialRouteName={Routes.loginWithPhone.name}
            headerMode={"none"}
          >
      <LoginStack.Group>
        <LoginStack.Screen name={Routes.loginWithPhone.name} component={PhoneSignIn}/>
      </LoginStack.Group>
    </LoginStack.Navigator>
  );
};



export { AppStack, AuthStack, Routes } 