import { useState } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { Button, Dialog } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { UploadAPI, PredictAPI } from '@/api/func';
import { useAppSelector } from '@/store';

export default function ImagePickerExample() {
  const { modeValue, characterValue } = useAppSelector(
    (state) => state.settings
  );

  const [image, setImage] = useState<string | null>(null);
  const [base64, setBase64] = useState<string>('');
  const [imageName, setImageName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setBase64(await uriToBase64(result.assets[0].uri));
      setImage(result.assets[0].uri);
      setImageName(result.assets[0].fileName as string);
      upload();
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
      setBase64(await uriToBase64(result.assets[0].uri));
      setImage(result.assets[0].uri);
      setImageName(result.assets[0].fileName as string);
      upload();
    }
  };

  const uriToBase64 = async (uri: string): Promise<string> => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const refresh = () => {
    setImage(null);
  };

  const upload = () => {
    // UploadAPI({
    //   name: imageName,
    //   data: base64,
    // })
    //   .then((res) => {
    //     console.log('Upload success');
    //   })
    //   .catch((err) => {
    //     console.error('Upload error:', err);
    //   });
  };

  const predict = () => {
    if (characterValue.length === 0) {
      toggleDialog();
      return;
    }
    setLoading(true);
    PredictAPI({
      UA: 'pc',
      mode: modeValue,
      metrics: characterValue,
      names: [imageName],
    }).then(() => {
      setLoading(false);
      alert('分析完成');
    });
  };

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const toggleDialog1 = () => {
    setLoading(!loading);
  };

  return (
    <View style={styles.container}>
      <Dialog isVisible={loading} onBackdropPress={toggleDialog1}>
        <Dialog.Loading />
        <Text style={styles.loadingText}>loading...</Text>
      </Dialog>

      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Title title="注意" />
        <Text>请先在“设置”页面选择特征！</Text>
        <Dialog.Actions>
          <Dialog.Button title="确认" onPress={toggleDialog} />
        </Dialog.Actions>
      </Dialog>

      {image && <Image source={{ uri: image }} style={styles.image} />}
      {!image && (
        <>
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
            onPress={() => takePhoto()}
          />
          <Button
            title="从相册选择"
            icon={{
              name: 'photo',
              type: 'font-awesome',
              size: 15,
              color: 'rgba(90, 154, 230, 1)',
            }}
            type="outline"
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '700', marginBottom: 3 }}
            buttonStyle={styles.button2}
            containerStyle={styles.buttonContainer}
            onPress={() => pickImage()}
          />
        </>
      )}
      {image && (
        <>
          <Button
            title="分析"
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
            onPress={() => predict()}
          />
          <Button
            title="重置"
            icon={{
              name: 'refresh',
              type: 'font-awesome',
              size: 15,
              color: 'rgba(90, 154, 230, 1)',
            }}
            type="outline"
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: '700', marginBottom: 3 }}
            buttonStyle={styles.button2}
            containerStyle={styles.buttonContainer}
            onPress={() => refresh()}
          />
        </>
      )}
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
    marginTop: 30,
  },
  button2: {
    borderColor: 'rgba(90, 154, 230, 1)',
    borderRadius: 30,
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
