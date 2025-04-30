import { View, ActivityIndicator, StatusBar } from "react-native";
import { Colors } from "../constant/Colors";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="light" />
      <ActivityIndicator size="large" color={Colors.lightGray} />
    </View>
  );
}
