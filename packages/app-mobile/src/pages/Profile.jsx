import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { IconButton, Avatar } from "react-native-paper";
import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";
import EventsHistoric from "../components/EventHistoric";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native"; 


const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState("");
  const [event, setEvent] = useState([]);

  const profileInfo = () => {
    axiosApiInstance
      .get(backendUrl + "users/" + userId)
      .then((data) => {
        setUser(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const historicalEventInfo = () => {
    axiosApiInstance
      .get(backendUrl + "events/me/" + userId)
      .then((response) => {
        setEvent(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    AsyncStorage.getItem("userId")
      .then((userId) => {
        setUserId(userId);
      })
      .catch((error) => {
        console.log(
          "Une erreur s'est produite lors de la récupération de userId :",
          error
        );
      });
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      profileInfo();
      historicalEventInfo();
    }, [userId])
  );

  return (
    <View style={{ flex: 1, padding: 16, marginTop: 30 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: 16,
        }}
      >
        <Avatar.Image size={100} source={require("../../assets/oclub.png")} />
        <IconButton
          icon="cog"
          size={30}
          onPress={() =>
            navigation.navigate("Modifier profil", { user, setUser })
          }
        />
      </View>

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        {user.nom} {user.prenom}
      </Text>

      <Text>Vos derniers événements</Text>

      <ScrollView>
        {event.map((item, index) => (
          <EventsHistoric item={item} key={index}  />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProfilePage;
