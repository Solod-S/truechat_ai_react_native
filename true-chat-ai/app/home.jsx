import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Vibration,
} from "react-native";
import { Animated, View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import ChatFaceData from "../constant/ChatFaceData";
import { useRouter } from "expo-router";
import useAuthStore from "../store/useAuthStore";
import { UsePreventBack } from "../hooks/usePreventBack";
import { Colors } from "../constant/Colors";

const HomeScreen = () => {
  UsePreventBack();
  const router = useRouter();
  const { logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [chatData, setChatData] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});
  const [animations, setAnimations] = useState({});

  useEffect(() => {
    setChatData(ChatFaceData);
    setSelectedChat(ChatFaceData[0]);

    // Создаем анимации для всех айтемов
    const anims = {};
    ChatFaceData.forEach(item => {
      anims[item.id] = new Animated.Value(
        item.id === ChatFaceData[0].id ? 1 : 0
      );
    });
    setAnimations(anims);
  }, []);

  const handleSelect = item => {
    if (selectedChat?.id === item?.id) return;

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Анимация для border/scale
      Animated.parallel([
        Animated.timing(animations[selectedChat.id], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animations[item.id], {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();

      setSelectedChat(item);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleLogout = () => {
    Vibration.vibrate(200); // Vibrate for 100ms before showing the Alert
    Alert.alert("Logout?", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            setLoading(true);
            await logout();
          } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);

            const formattedMessage = errorCode
              .replace("auth/", "")
              .replace(/-/g, " ");
            // .replace(/\b\w/g, char => char.toUpperCase());
            if (isIphone) {
              Toast.show({
                type: "error",
                position: "top",
                text1: "Login Failed",
                text2: formattedMessage,
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 50,
              });
            } else {
              ToastAndroid.show(formattedMessage, ToastAndroid.LONG);
            }
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
      <StatusBar style="dark" />
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity
          onPress={handleLogout}
          style={{ alignSelf: "flex-end" }}
        >
          <Ionicons name="exit" size={hp(3.6)} color={Colors.background} />
        </TouchableOpacity>
      </View>

      <View
        style={{ alignItems: "center", paddingTop: 90, paddingHorizontal: 20 }}
      >
        <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
          <Text
            style={{
              color: selectedChat?.primary,
              fontSize: hp(3.4),
              fontWeight: "bold",
            }}
          >
            Hello,
          </Text>
          <Text style={{ fontSize: hp(2) }}>I'm {selectedChat?.name}</Text>
          <Image
            source={selectedChat?.image}
            style={{ marginTop: 20, width: wp(40), height: wp(40) }}
          />
          <Text
            style={{
              marginTop: 15,
              fontSize: hp(2),
              textAlign: "center",
              opacity: 0.5,
            }}
          >
            {selectedChat?.specialization?.split(":")[1]?.trim()}
          </Text>
        </Animated.View>

        <View
          style={{
            marginTop: 10,
            alignItems: "center",
            height: wp(34),
            borderRadius: 10,
            padding: 10,
          }}
        >
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={chatData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              const animation = animations[item.id] || new Animated.Value(0);

              return (
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <Animated.View
                    style={{
                      margin: 12,
                      padding: 4,
                      borderRadius: 15,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 2], // Без выбора — 0, выбран — 2
                      }),
                      borderColor: selectedChat?.primary || "black",
                      transform: [
                        {
                          scale: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.1], // Увеличение выбранного
                          }),
                        },
                      ],
                    }}
                  >
                    <Image
                      source={item?.image}
                      style={{ width: wp(12), height: wp(12) }}
                    />
                  </Animated.View>
                </TouchableOpacity>
              );
            }}
          />

          <Text style={{ marginTop: 5, fontSize: hp(1.7), color: "#B0B0B0" }}>
            Choose your chatBuddy
          </Text>
        </View>

        <TouchableOpacity
          style={{
            padding: 17,
            width: wp(60),
            alignItems: "center",
            borderRadius: 25,
            marginTop: 30,
            backgroundColor: selectedChat.primary,
          }}
          onPress={() =>
            router.push({
              pathname: "chatScreen",
              params: {
                selected: JSON.stringify(selectedChat),
              },
            })
          }
        >
          <Text style={{ fontSize: hp(2), color: "#fff" }}>Let's Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
