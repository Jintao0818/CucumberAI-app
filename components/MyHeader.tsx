import { View, Text, StyleSheet } from 'react-native'
import { Header, Badge } from '@rneui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Ionicons from '@expo/vector-icons/Ionicons';



export default function MyHeader({status}: {status: boolean}) {
  return (
    <Header
      leftComponent={{ icon: 'menu', color: '#fff' }}
      centerComponent={{ text: 'CucumberAI', style: styles.heading }}
      rightComponent={
        <GestureHandlerRootView>
          <View style={{marginRight: 10}}>
            <Text style={styles.headerRight}>GPU</Text>
            <Badge status={status ? 'success' : 'error'} containerStyle={{ position: 'absolute', top: 5, left: 45 }}/>
          </View>
        </GestureHandlerRootView>
      }
    />
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
    height: 100
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    marginTop: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});