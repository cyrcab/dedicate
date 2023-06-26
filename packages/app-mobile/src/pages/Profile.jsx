import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Card, IconButton, Avatar } from "react-native-paper";
import { axiosApiInstance } from "../../axios.config";
import { backendUrl } from "../backendUrl";

const ProfilePage = () => {
  const [user, setUser] = useState({});

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const profileInfo = () => {
    axiosApiInstance
      .get(backendUrl + "users/" + "9")
      .then((data) => {
        setUser(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    profileInfo();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
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
          onPress={() => console.log("Pressed")}
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
