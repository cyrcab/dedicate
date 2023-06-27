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
        <View style={{display:'flex', height:'100%', alignItems:'center', justifyContent:'center'}}>
            <Text>Home</Text>
            <Button
            onPress={removeAsyncToken}
            >Logout</Button>
        </View>
    );
}
