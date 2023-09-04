import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';


const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => (
    <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen name="Se connecter" component={Login} options={{ headerShown: false }}/>
        <AuthStack.Screen name="Créer un compte" component={Register} />
    </AuthStack.Navigator>
);

export default AuthNavigator;