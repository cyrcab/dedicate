import { Card, Divider } from "react-native-paper";
import { Image } from "react-native";

export default function MusicList({item}) {
  return (
    <>
      <Card.Title
        title={item.musique.titre}
        subtitle={item.musique.artiste}
        left={() => (
            <Image
              source={{uri : item.musique.album}} // Remplacez le chemin par le chemin réel de votre image
              style={{ width: 50, height: 50 }} // Spécifiez la largeur et la hauteur de l'image selon vos besoins
            />
          )}
      />
      <Divider />
    </>
  );
}
