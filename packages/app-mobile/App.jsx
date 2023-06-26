import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import { colors } from './src/theme';
import { Provider } from 'react-redux';
import store from './src/store/store';

import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import MainNavigator from './src/navigation/MainNavigator';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: colors,
};

function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Register">
            <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="App" component={AppNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
