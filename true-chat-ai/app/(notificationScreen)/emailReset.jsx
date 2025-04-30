import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { Colors } from "../../constant/Colors";
import { StatusBar } from "expo-status-bar";

export default function EmailReset() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.background,
        flex: 1,
        padding: 20,
        paddingTop: 30,
        gap: 30,
        alignItems: "center",
      }}
      edges={["top"]}
    >
      <StatusBar style="light" />
      <View style={{ alignItems: "center" }}>
        <Animated.Text
          entering={FadeInDown.delay(200).springify()}
          style={{
            marginTop: 10,
            textAlign: "center",
            fontSize: hp(3.2),
            fontFamily: "outfit-bolt",
            color: Colors.white,
          }}
        >
          Check Your Email
        </Animated.Text>

        <View style={{ width: wp(80), marginTop: 20 }}>
          <View style={{ aspectRatio: 1 }}>
            <LottieView
              style={{ flex: 1 }}
              source={require("../../assets/images/email.json")}
              autoPlay
              loop
              speed={0.7}
            />
          </View>
        </View>
      </View>
      <Animated.View entering={FadeInDown.delay(300).springify()}>
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            fontSize: hp(2),
            color: Colors.white,
            fontFamily: "outfit",
          }}
        >
          We have sent you an email with instructions on how to reset your
          password. Please check your inbox and follow the steps provided. If
          you don’t see the email, check your spam folder or request a new one
          from your account settings.
        </Text>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(400).springify()}
        style={{ width: "100%" }}
      >
        <TouchableOpacity
          onPress={() => router.replace("welcome")}
          // emailVerify
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
            marginTop: 30,
          }}
        >
          <Text
            style={{
              fontSize: hp(2),
              color: Colors.white,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            Go Back
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}
