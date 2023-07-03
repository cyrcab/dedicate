import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Card, IconButton, Avatar } from "react-native-paper";
import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState('');

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

  useEffect(() => {
    profileInfo()
  }, [userId]);
  

  return (
    <View style={{ flex: 1, padding: 16, marginTop: 30}}>
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
        <Card.Title
          title="Oclub"
          subtitle="Soirée électro-funk"
          left={() => (
            <Image
              source={require("../../assets/oclub.png")} // Remplacez le chemin par le chemin réel de votre image
              style={{ width: 50, height: 50 }} // Spécifiez la largeur et la hauteur de l'image selon vos besoins
            />
          )}
          onPress={() => {
            console.log("pressed");
          }}
        />
        <Card.Title
          title="Oclub"
          subtitle="Soirée électro-funk"
          left={() => (
            <Image
              source={require("../../assets/oclub.png")} // Remplacez le chemin par le chemin réel de votre image
              style={{ width: 50, height: 50 }} // Spécifiez la largeur et la hauteur de l'image selon vos besoins
            />
          )}
          onPress={() => {
            console.log("pressed");
          }}
        />
        <Card.Title
          title="Oclub"
          subtitle="Soirée électro-funk"
          left={() => (
            <Image
              source={require("../../assets/oclub.png")} // Remplacez le chemin par le chemin réel de votre image
              style={{ width: 50, height: 50 }} // Spécifiez la largeur et la hauteur de l'image selon vos besoins
            />
          )}
          onPress={() => {
            console.log("pressed");
          }}
        />
        <Card.Title
          title="Oclub"
          subtitle="Soirée électro-funk"
          left={() => (
            <Image
              source={require("../../assets/oclub.png")} // Remplacez le chemin par le chemin réel de votre image
              style={{ width: 50, height: 50 }} // Spécifiez la largeur et la hauteur de l'image selon vos besoins
            />
          )}
          onPress={() => {
            console.log("pressed");
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ProfilePage;
