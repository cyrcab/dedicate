import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from "react-redux";
import { setSignedIn } from "../store/reducers/reducer";




export default function Event() {

    const dispatch = useDispatch();

    function removeAsyncToken(){
        AsyncStorage.removeItem('token');
        dispatch(setSignedIn(false));
    }
    return (
        <View>
            <Text>Event</Text>
            <Button
            onPress={removeAsyncToken}
            >Logout</Button>
        </View>
    );
}
