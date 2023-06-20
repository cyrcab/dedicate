import React, { useState } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { Card, IconButton, Avatar } from "react-native-paper";

const ProfilePage = () => {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
  });

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center",justifyContent: "space-around",  marginBottom: 16 }}
      >
        <Avatar.Image size={100} source={require("../../assets/oclub.png")} />
        <IconButton
          icon="cog"
          size={30}
          onPress={() => console.log("Pressed")}
        />
      </View>

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        {user.firstName} {user.lastName}
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
