import { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const refresh = () => {
    setImage(null);
  }

  const upload = () => {

    alert('Uploaded!');
    // refresh();
  }

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {!image && <>
      <Button
        title="拍照"
        icon={{
          name: 'camera',
          type: 'font-awesome',
          size: 15,
          color: 'white',
        }}
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700', marginBottom: 3 }}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => takePhoto()} />
      <Button
        title="从相册选择"
        icon={{
          name: 'photo',
          type: 'font-awesome',
          size: 15,
          color: 'rgba(90, 154, 230, 1)',
        }}
        type='outline'
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700', marginBottom: 3 }}
        buttonStyle={styles.button2}
        containerStyle={styles.buttonContainer}
          onPress={() => pickImage()} />
      </>
      }
      {image && <>
      <Button
        title="上传"
        icon={{
          name: 'upload',
          type: 'font-awesome',
          size: 15,
          color: 'white',
        }}
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700', marginBottom: 3 }}
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => upload()} />
      <Button
        title="重置"
        icon={{
          name: 'refresh',
          type: 'font-awesome',
          size: 15,
          color: 'rgba(90, 154, 230, 1)',
        }}
        type='outline'
        iconContainerStyle={{ marginRight: 10 }}
        titleStyle={{ fontWeight: '700', marginBottom: 3 }}
        buttonStyle={styles.button2}
        containerStyle={styles.buttonContainer}
        onPress={() => refresh()} />
      </>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 408,
    height: 306,
  },
  button: {
    backgroundColor: 'rgba(90, 154, 230, 1)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
    marginTop: 30
  },
  button2: {
    borderColor: 'rgba(90, 154, 230, 1)',
    borderRadius: 30,
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  }
});
