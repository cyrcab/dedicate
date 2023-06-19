import { View, Text } from "react-native";
import { colors } from "../theme";

export default function Login() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{backgroundColor: colors.primaryContainer}}>Login</Text>
    </View>
  );
}
