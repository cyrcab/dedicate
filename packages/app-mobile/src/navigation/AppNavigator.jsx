import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Event from "../pages/Event";
import Settings from "../pages/Settings";
import ReadMore from "../pages/ReadMore";
import EventInformation from "../pages/EventInformation";
import SlotInformation from "../pages/SlotInformation";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Profil" component={Profile} options={{ headerShown: false }}/>
    <Stack.Screen name="Modifier profil" component={Settings} />
    <Stack.Screen name="Informations de la soirée" component={EventInformation}/>
  </Stack.Navigator>
);

const EventStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Event" component={Event} options={{ headerShown: false }}/>
    <Stack.Screen name="SlotsInformation" component={SlotInformation} />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
    <Stack.Screen name="ReadMore" component={ReadMore} />
  </Stack.Navigator>
);

const EventStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Event" component={Event} options={{ headerShown: false }}/>
    <Stack.Screen name="SlotsInformation" component={SlotInformation} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Tab.Navigator
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
    <Tab.Screen name="Acceuil" component={HomeStack} />
    <Tab.Screen name="Evénements" component={EventStack} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

export default AppNavigator;
