import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Icon, ListItem, Avatar } from '@rneui/themed';
import MyTitle from '@/components/MyTitle';
import StepIndicator from 'react-native-step-indicator';
import { useState } from 'react';
import * as MediaLibrary from 'expo-media-library';

export default function Info() {
  const stepLabels = ['选择参数', '上传图片', '分析', '查看结果'];
  const stepStyles = {
    stepIndicatorSize: 25,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 4,
    stepStrokeCurrentColor: '#397af8',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#397af8',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#397af8',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#397af8',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#397af8',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#397af8',
  };

  const stepTextList = ['选择参数', '上传图片', '分析', '查看结果'];

  const [stepPosition, setStepPosition] = useState(0);
  const [stepText, setStepText] = useState(stepTextList[0]);
  const imgUrl =
    'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg';

  const onStepChange = (position: number) => {
    setStepPosition(position);
    setStepText(stepTextList[position]);
  };

  const saveImg = async (item: string) => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) return;
    const asset = await MediaLibrary.createAssetAsync(item);
    MediaLibrary.createAlbumAsync('Images', asset, false)
      .then(() => {
        console.log('保存成功');
      })
      .catch(() => {
        console.log('保存失败');
      });
  };

  return (
    <ScrollView bouncesZoom={true} alwaysBounceVertical={true}>
      <MyTitle title="示例图片" buttonTitle="download" />

      <Card containerStyle={styles.card}>
        {/* <Card.Title>HELLO WORLD</Card.Title> */}

        <Card.Image style={{ padding: 0 }} source={{ uri: imgUrl }} />
        <Text style={{ marginBottom: 10 }}>
          The idea with React Native Elements is more about component structure
          than actual design.
        </Text>
        <Button
          icon={
            <Icon name="code" color="#ffffff" iconStyle={{ marginRight: 10 }} />
          }
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title="Use this Picture"
          onPress={() => saveImg(imgUrl)}
        />
      </Card>

      <MyTitle title="使用步骤" />
      <Card containerStyle={styles.card}>
        <StepIndicator
          onPress={(position) => onStepChange(position)}
          currentPosition={stepPosition}
          labels={stepLabels}
          customStyles={stepStyles}
          stepCount={stepLabels.length}
        />
        <Card.Image
          style={{ padding: 0, marginTop: 10 }}
          source={{
            uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
          }}
        />
        <Text style={{ marginBottom: 10 }}>{stepText}</Text>
      </Card>
      <View style={{ height: 150 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 25,
    // backgroundColor: 'yellow',
    marginTop: 0,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: 200,
  },
});
