import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Profile from '../pages/Profile'
import Event from '../pages/Event';

const Tab = createBottomTabNavigator();


const AppNavigator = () => (
    <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Acceuil" component={Home} />
        <Tab.Screen name="Evénements" component={Event} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
);

export default AppNavigator;