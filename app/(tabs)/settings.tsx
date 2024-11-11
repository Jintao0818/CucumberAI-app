import CheckGruop from '@/components/CheckGroup';
import MyTitle from '@/components/MyTitle';
import { Avatar, Card, Icon, ListItem } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import type { CheckListItem } from '@/models';
import { useAppDispatch } from '@/store';
import { setCharacterValue } from '@/store/modules/settings';
import {
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from 'react-native';

export default function Settings() {
  const dispatch = useAppDispatch();
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [list, setList] = useState<CheckListItem[]>([]);

  const fruitList: CheckListItem[] = [
    {
      key: 'fruit shape',
      title: '瓜型',
      subTitle: '包含长度、面积等多个形状参数',
      checked: false,
    },
    {
      key: 'color & texture',
      title: '颜色纹理',
      subTitle: '包含多种颜色空间和纹理特征参数',
      checked: false,
    },
    {
      key: 'stripe',
      title: '瓜斑',
      subTitle: '包含瓜斑类型、占比',
      checked: false,
    },
    {
      key: 'tumor',
      title: '瓜瘤',
      subTitle: '指瓜瘤密度（取瓜中部）',
      checked: false,
    },
  ];

  const pulpList: CheckListItem[] = [
    {
      key: 'pulp shape',
      title: '光滑程度',
      subTitle: '包含圆填充率等多个形状参数',
      checked: false,
    },
    {
      key: 'flesh & heart',
      title: '果肉心腔',
      subTitle: '包含面积、占比、厚度等多种果肉心腔参数',
      checked: false,
    },
  ];

  useEffect(() => {
    setList(fruitList);
  }, []);

  const onModeChange = (index: number) => {
    setSelectedButtonIndex(index);
    setList(index === 0 ? fruitList : pulpList);
    dispatch(setCharacterValue([]));
  };

  const onChecked = (key: string) => {
    setList((list) => {
      return list.map((item) => {
        return item.key === key ? { ...item, checked: !item.checked } : item;
      });
    });

    let metrics: string[] = [];
    list.map((item) => {
      item.checked ? metrics.push(item.key) : null;
    });
    dispatch(setCharacterValue(metrics));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={() => null} />
          </View>
        </View> */}
        <View>
          <MyTitle title="特征选择" buttonTitle="reset" />
          <Card containerStyle={styles.card}>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>🥒 输入图片类型: </ListItem.Title>
              </ListItem.Content>
              <ListItem.ButtonGroup
                buttons={['果实', '果肉']}
                selectedIndex={selectedButtonIndex}
                onPress={(index) => onModeChange(index)}
              />
            </ListItem>
            <CheckGruop list={list} onPress={onChecked} />
          </Card>

          <MyTitle title="参照物" />
          <Card containerStyle={styles.card}>
            <ListItem>
              <ListItem.Input
                placeholder="请输入参照物边长"
                leftIcon={{
                  type: 'font-awesome',
                  name: 'square',
                  color: 'gray',
                }}
              />
            </ListItem>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    // backgroundColor: 'yellow',
    marginTop: 0,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
