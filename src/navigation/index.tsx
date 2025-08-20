import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import linking from './linking';
import HomeScreen from '@/screens/HomeScreen';
import ProductDetailScreen from '@/screens/ProductDetailScreen';
import { useEffect } from 'react';
import { configureNotifications } from '@/utils/notifications';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  useEffect(() => {
    configureNotifications();
  }, []);

  return (
    <NavigationContainer theme={DefaultTheme} linking={linking}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Products' }} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Product' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
