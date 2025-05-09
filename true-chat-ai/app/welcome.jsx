import { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  FadeIn,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "../constant/Colors";
import { UsePreventBack } from "../hooks/usePreventBack";

export default function WelcomeScreen() {
  UsePreventBack();
  const ring2padding = useSharedValue(0);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      ring2padding.value = 0;
      ring2padding.value = withSpring(ring2padding.value + hp(3));
    }, 300);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={[styles.ring, { padding: ring2padding }]}>
        <Image
          source={require("./../assets/images/welcome.png")}
          style={styles.image}
        />
      </Animated.View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>True Chat AI</Text>
        <Text style={styles.subtitle}>Smart Chats, Real Insights.</Text>
      </View>
      <Animated.View entering={FadeIn.delay(600).springify()}>
        <TouchableOpacity
          onPress={() => router.push("/auth/login")}
          style={{
            height: hp(7),
            width: wp(80),
            backgroundColor: Colors.backgroundSecondary,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 9999,
            borderWidth: 2,
            borderColor: Colors.white,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: hp(3),
              color: Colors.white,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View entering={FadeIn.delay(600).springify()}>
        <TouchableOpacity
          onPress={() => router.push("/auth/signUp")}
          style={{
            height: hp(7),
            width: wp(80),
            backgroundColor: Colors.backgroundSecondary,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            borderRadius: 9999,
            borderWidth: 2,
            borderColor: Colors.white,
          }}
        >
          <Text
            style={{
              fontSize: hp(3),
              color: Colors.white,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingVertical: 20,
  },
  ring: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 9999,
    marginBottom: 24,
  },
  image: {
    width: hp(21),
    height: hp(21),
  },
  textContainer: {
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: hp(5),
    fontWeight: "bold",
    color: Colors.white,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: hp(2),
    fontWeight: "500",
    color: Colors.white,
    letterSpacing: 2,
  },
});
