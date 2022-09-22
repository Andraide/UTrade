import React, { useState, useEffect } from "react";
import { View, Text, Platform, StatusBar, Dimensions, KeyBoardAvoidingView, Input, StyleSheet, TextInput, Button } from "react-native";
import DeviceInfo from "react-native-device-info"
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik'
import auth from '@react-native-firebase/auth';

const hasNotch = DeviceInfo.hasNotch()
const heigthScreen = Dimensions.get('window').height
import * as yup from 'yup'
import { Routes } from "../../navigator/StackNavigator";


const Login = ({ navigation }) => {

  const [ notch, setNotch ] = useState(false)
  const [ notchHeight, setNotchHeigth ] = useState(0)

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  
    /*
     .email("Please enter valid email")
          .required('Email Address is Required'),
    */
   /*
   .min(8, ({ min }) => `Password must be at least ${min} characters`)
          .required('Password is required'),
   */
  async function onAuthStateChanged(user) {
    console.log(user)
    setUser(user);
    const token = await auth().currentUser?.getIdToken();
    console.log(token)
    //if (initializing) setInitializing(false);
  }


  
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

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [])

  async function signUpWithEmail() {
    auth()
    .createUserWithEmailAndPassword('t@t.com', 'tttttt')
    .then(() => {
        console.log('User account created & signed in!');
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        }

        console.error(error);
    });
  }

  async function signInWithEmail(email: string, password: string) {
    auth()
    .signInWithEmailAndPassword(email, password)
    .then((credentials) => {
      console.log("Credentials", credentials)
    })
    .catch(error => {
      console.log("Error signInWithEmail", error)
    })
  }

  async function signOut() {
    auth()
    .signOut()
    .then(() => console.log('User signed out'))
  }

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string(),
    password: yup
      .string()
  })
        
  return ( 
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: notch ? notchHeight : 0 }}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
          //signUpWithEmail()
          const { email, password } = values
          signInWithEmail(email, password)
          //navigation.navigate(Routes.home.name)
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            <TextInput
              name="email"
              placeholder="Email Address"
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email &&
              <Text style={{ fontSize: 10, color: 'red', textAlign: 'center' }}>{errors.email}</Text>
            }
            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password &&
              <Text style={{ fontSize: 10, color: 'red', textAlign: 'center' }}>{errors.password}</Text>
            }
            <Button
              onPress={handleSubmit}
              title="LOGIN"
              disabled={!isValid}
            />
          </>
        )}
      </Formik>
      <Button
        onPress={signOut}
        title="SIGN OUT"
      />
    </View>
  )
}



const styles = StyleSheet.create({

    loginContainer: {
      width: '80%',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 10,
      elevation: 10,
      backgroundColor: '#e6e6e6'
    },
    textInput: {
      height: 40,
      width: '90%',
      margin: 10,
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 10,
    },
  })

export { Login }