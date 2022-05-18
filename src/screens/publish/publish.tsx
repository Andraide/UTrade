import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

import { ImagePickerHeader } from '../../components/image-picker-header';
import { ImagePickerModal } from '../../components/image-picker-modal';
import { ImagePickerAvatar } from '../../components/image-picker-avatar';

const SERVER_URL = 'http://localhost:3000';

const createFormData = (uri ,photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const handleUploadPhoto = (uri, photo) => {
  fetch(`${SERVER_URL}/api/upload`, {
    method: 'POST',
    body: createFormData(uri ,photo, { userId: '123' }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log('response', response);
    })
    .catch((error) => {
      console.log('error', error);
    });
};

const Publish = () => {
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = React.useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  return (
    <View style={styles.screen}>
      <ImagePickerHeader />
      <ImagePickerAvatar uri={uri} onPress={() => setVisible(true)} />
      <ImagePickerModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onImageLibraryPress={onImageLibraryPress}
        onCameraPress={onCameraPress}
      />
      <Button onPress={() => handleUploadPhoto(uri, pickerResponse)} title='Upload'></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2fC',
  },
});

export { Publish }