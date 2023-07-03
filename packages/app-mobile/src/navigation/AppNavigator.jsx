import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Event from "../pages/Event";
import Settings from "../pages/Settings"

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
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "Acceuil") {
          iconName = focused ? "home" : "home-outline";
        } else if (route.name === "Evénements") {
          iconName = focused ? "calendar" : "calendar-outline";
        } else if (route.name === "Profile") {
          iconName = focused ? "person" : "person-outline";
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Acceuil" component={Home} />
    <Tab.Screen name="Evénements" component={Event} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

export default AppNavigator;
