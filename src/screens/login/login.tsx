import React, { useState, useEffect } from "react";
import { View, Text, Platform, StatusBar, Dimensions, KeyBoardAvoidingView, Input, StyleSheet, TextInput, Button } from "react-native";
import DeviceInfo from "react-native-device-info"
import { useNavigation } from "@react-navigation/native";
import { Formik } from 'formik'

const hasNotch = DeviceInfo.hasNotch()
const heigthScreen = Dimensions.get('window').height
import * as yup from 'yup'
import { Routes } from "../../navigator/routes";


const Login = ({ navigation }) => {

    const [ notch, setNotch ] = useState(false)
    const [ notchHeight, setNotchHeigth ] = useState(0)

    const loginValidationSchema = yup.object().shape({
        email: yup
          .string(),
         
        password: yup
          .string()
          
      })
    /*
     .email("Please enter valid email")
          .required('Email Address is Required'),
    */
   /*
   .min(8, ({ min }) => `Password must be at least ${min} characters`)
          .required('Password is required'),
   */
      
  
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

        console.log("Status bar", StatusBar.currentHeight, heigthScreen)
    })
  
      
          
    return ( 
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: notch ? notchHeight : 0 }}>
        <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
          console.log("Navigate")
          navigation.navigate(Routes.home.name)
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