import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Text } from 'react-native-paper';

import Home from '../pages/Home';
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();


const AppNavigator = () => (
    <Tab.Navigator initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
);

export default AppNavigator;