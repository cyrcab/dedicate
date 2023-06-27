import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import AppNavigator from "../navigation/AppNavigator";
import AuthNavigator from "../navigation/AuthNavigator";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setSignedIn } from "../store/reducers/reducer";

export default function Main() {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.isSignedIn);
  
  useEffect(() => {
    checkToken();
  }, [isSignedIn]);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        dispatch(setSignedIn(false));
        return;
      }
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        dispatch(setSignedIn(false));
        return;
      }
      dispatch(setSignedIn(true));
    } catch (error) {
      dispatch(setSignedIn(false));
    }
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Screen
            name="App"
            component={AppNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );  
}