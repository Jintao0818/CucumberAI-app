import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Text, Button } from '@rneui/themed';

export default function MyTitle({
  title,
  buttonTitle,
  onPress,
}: {
  title: string;
  buttonTitle?: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.titleContiner}>
      <Text style={styles.title}>{title}</Text>
      {buttonTitle && (
        <Button title={buttonTitle} onPress={onPress} type="clear"></Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 20,
    height: 40,
    // fontSize: 20
    // backgroundColor: "pink"
  },
  title: {
    color: '#596067',
  },
});
