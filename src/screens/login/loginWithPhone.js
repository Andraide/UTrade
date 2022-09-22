import React, { useState, useEffect } from 'react';
import { Button, TextInput, View, Platform, StatusBar } from 'react-native';
import DeviceInfo from "react-native-device-info"
import auth from '@react-native-firebase/auth';
import { Routes } from "../../navigator/StackNavigator";


function PhoneSignIn({ navigation }) {

  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');

  const [ notch, setNotch ] = useState(false)
  const [ notchHeight, setNotchHeigth ] = useState(0)

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [token, setToken] = useState(null)

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    console.log("Sign in with phone number")
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function onAuthStateChanged(user) {
    console.log(user)
    setUser(user);
    const token = await auth().currentUser?.getIdToken();
    console.log(token)
    setToken(token)
    if(user && token)
    {
      navigation.navigate(Routes.home.name)
    }
  }

  useEffect(() => {

    if(user && token)
    {
      navigation.navigate(Routes.home.name)
    }

   if(Platform.OS == 'ios')
      {
          setNotch(true)
          setNotchHeigth(heigthScreen/20)
      }
      else
      {
          setNotch(true)
          setNotchHeigth(StatusBar.currentHeight)
      }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [])


  async function confirmCode() {
    try {
      //setConfirm(null)
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
        <View style={{ flex: 1, backgroundColor: 'red' }}>
            <Button
            title="Phone Number Sign In"
            onPress={() => signInWithPhoneNumber('+1 650-555-1234')}
            />
        </View>
    );
  }

  return (
    <View style={{ flex: 1, height: 1000, backgroundColor: 'red' }}>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
    
  );
}

export { PhoneSignIn }