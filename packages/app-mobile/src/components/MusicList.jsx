import { Card, Divider } from "react-native-paper";
import { Image } from "react-native";

export default function MusicList({item}) {

  return (
    <>
      <Card.Title
        title={item.Musique.titre}
        subtitle={item.Musique.artiste}
        left={() => (
            <Image
              source={{uri : item.Musique.album}} // Remplacez le chemin par le chemin réel de votre image
              style={{ width: 50, height: 50 }} // Spécifiez la largeur et la hauteur de l'image selon vos besoins
            />
          )}
      />
      <Divider />
    </>
  );
}
