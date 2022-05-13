import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NestedHome } from './Nesting';
import { Login } from '../screens/login/login'
import { Publish } from '../screens/publish/publish'
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
    locationPermissions: { name: 'locationPermissions' },
    publish: { name: 'publish' }
};

const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();

const AppStack = () => {
    return (
      <HomeStack.Navigator
              initialRouteName={Routes.login.name}
              headerMode={"none"}
            >
        <HomeStack.Group>
          <HomeStack.Screen name={Routes.login.name} component={Login}/>
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
            initialRouteName={Routes.login.name}
            headerMode={"none"}
          >
      <LoginStack.Group>
        <LoginStack.Screen name={Routes.login.name} component={Login}/>
      </LoginStack.Group>
    </LoginStack.Navigator>
  );
};



export { AppStack, AuthStack } 