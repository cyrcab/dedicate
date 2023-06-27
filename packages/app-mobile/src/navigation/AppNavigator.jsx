import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Event from "../pages/Event";
import Settings from "../pages/Settings"
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profil" component={Profile} />
    <Stack.Screen name="Modifier profil" component={Settings} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Tab.Navigator 
  initialRouteName="Home"
  screenOptions={{
    headerShown: false,
  }}
  >
    <Tab.Screen name="Acceuil" component={Home} />
    <Tab.Screen name="Evénements" component={Event} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

export default AppNavigator;
