import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import { colors } from './src/theme';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors:colors,
};

function App() {
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}

export default App;