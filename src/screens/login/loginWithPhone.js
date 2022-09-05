import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/app';

function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
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
            onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
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