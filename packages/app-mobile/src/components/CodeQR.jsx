import { Button } from "react-native-paper";

export default function CodeQR() {
  return (
    <>
      <Button
        icon="qrcode"
        mode="contained"
        style={{
          borderRadius: 50,
          width: 60,
          height: 62,
          position: "absolute",
          bottom: 20,
          left: "41%",
        }}
        contentStyle={{ width: 80, height: 60 }}
        labelStyle={{ fontSize: 40 }}
      />
    </>
  );
}
