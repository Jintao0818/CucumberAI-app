import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MyTabBar from '@/components/MyTabBar';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <MyTabBar {...props} />}
      >
        {/* <Tabs.Screen
          name="settings"
          options={{
            title: "设置",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'settings-sharp' : 'settings-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "主页",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
            ),
          }} />
        <Tabs.Screen
          name="info"
          options={{
            title: "向导",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'information-circle-sharp' : 'information-circle-outline'} color={color} size={24} />
            ),
          }}
        /> */}
      </Tabs>
    </>
  );
}
