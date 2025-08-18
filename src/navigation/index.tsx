import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';

import HomeScreen from '@/screens/HomeScreen';
import ProductDetailScreen from '@/screens/ProductDetailScreen';
import CategoryScreen from '@/screens/CategoryScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['modak://', 'https://modak.app'],
  config: {
    screens: {
      Home: '',
      ProductDetail: 'product/:id',
      Category: 'category/:slug',
    },
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={DefaultTheme} linking={linking}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Products' }} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Product' }}
        />
        <Stack.Screen name="Category" component={CategoryScreen} options={{ title: 'Category' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
