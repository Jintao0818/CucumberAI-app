import { Tabs } from 'expo-router';

import MyTabBar from '@/components/MyTabBar';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <MyTabBar {...props} />}
      >
        <Tabs.Screen name="settings" options={{ title: '设置' }} />
        <Tabs.Screen name="index" options={{ title: '主页' }} />
        <Tabs.Screen name="info" options={{ title: '向导' }} />
        <Tabs.Screen name="result" options={{ title: '结果' }} />
      </Tabs>
    </>
  );
}
