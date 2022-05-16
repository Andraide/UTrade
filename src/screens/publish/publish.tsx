import React, { useEffect } from 'react';
import { View, Image, Button, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
//import { useEffect } from 'react/cjs/react.production.min';
import {checkMultiple, requestMultiple, PERMISSIONS} from 'react-native-permissions';
import { checkResult } from '../../helpers/checks';

const SERVER_URL = 'http://localhost:3000';

const createFormData = (photo, body = {}) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const Publish = () => {
  const [photo, setPhoto] = React.useState(null);


  useEffect(() => {
    checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY]).then((statuses) => {
      console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
      console.log('FaceID', statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]);
      if(checkResult(statuses[PERMISSIONS.IOS.CAMERA]) && checkResult(statuses[PERMISSIONS.IOS.MEDIA_LIBRARY]))
      {
        console.log("Entering", checkResult(statuses[PERMISSIONS.IOS.CAMERA]))
      }
      else
      {
        requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MEDIA_LIBRARY]).then((statuses) => {
          console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
          console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
        })
      }
    })
  })
    /*checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.FACE_ID]).then((statuses) => {
      console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
      console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
      if(statuses[PERMISSIONS.IOS.CAMERA] && statuses[PERMISSIONS.IOS.FACE_ID])
      {}
      else
      {
        requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.FACE_ID]).then((statuses) => {
          console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
          console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
        })
      }
    });*/

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      // console.log(response);
      if (response) {
        setPhoto(response);
      }
    });
  };

  const handleUploadPhoto = () => {
    fetch(`${SERVER_URL}/api/upload`, {
      method: 'POST',
      body: createFormData(photo, { userId: '123' }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {photo && (
        <>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
        </>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
};

export { Publish };