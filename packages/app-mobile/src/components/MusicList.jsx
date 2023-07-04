import { Card, Divider } from "react-native-paper";

export default function MusicList({}) {
  return (
    <>
      <Card.Title
        title="La puissance"
        subtitle="Rohff"
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
      />
      <Divider />
    </>
  );
}
