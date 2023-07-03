import { View, Text } from "react-native";
import styles from "./styles";

export default function ReadMore({route}){
    const { event, setEvent } = route.params;

    return(
        <View>
            <View style={styles.ReadMoreHeader}>
            <Text></Text>
            </View>
        </View>
    );
}