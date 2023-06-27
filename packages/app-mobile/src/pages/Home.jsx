import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { setSignedIn } from "../store/reducers/reducer";




export default function Home() {

    const dispatch = useDispatch();

    function removeAsyncToken(){
        AsyncStorage.removeItem('token');
        dispatch(setSignedIn(false));
    }
    return (
        <View>
            <Text>Home</Text>
            <Button
            onPress={removeAsyncToken}
            >remove async storage</Button>
        </View>
    );
}
