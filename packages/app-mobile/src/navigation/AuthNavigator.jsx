import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';


const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => (
    <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
);

export default AuthNavigator;