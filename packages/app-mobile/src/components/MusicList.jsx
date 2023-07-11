import { Card, Divider } from "react-native-paper";
import { Image } from "react-native";

export default function MusicList({item}) {

  return (
    <>
      <Card.Title
        title={item.titre}
        subtitle={item.artiste}
        left={() => (
            <Image
              source={require("../../assets/oclub.png")} // Remplacez le chemin par le chemin réel de votre image
              style={{ width: 50, height: 50 }} // Spécifiez la largeur et la hauteur de l'image selon vos besoins
            />
          )}
      />
      <Divider />
    </>
  );
}
