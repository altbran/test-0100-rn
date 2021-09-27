import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './app/screens/Home';
import OrderProducts from './app/screens/OrderProducts';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen 
          name="Order Products Details"
          component={OrderProducts}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}