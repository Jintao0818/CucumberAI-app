import MyHeader from "@/components/MyHeader";
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from "@/store";
import { Provider } from "react-redux";
import useInit from "@/hooks/useInit";
import { View } from "react-native";
export default function RootLayout() {

  const { status } = useInit()
  
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        
        <Stack>
          <Stack.Screen name="(tabs)" options={{
            header: () => <MyHeader status={status} />
            }}
          />
        </Stack>
        
      </SafeAreaProvider>
    </Provider>
    

  );
}
