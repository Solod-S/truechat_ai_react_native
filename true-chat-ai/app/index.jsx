import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ChatFaceData from "../constant/ChatFaceData";
import { useRouter } from "expo-router";

const homeScreen = () => {
  const router = useRouter();
  const [chatData, setChatData] = useState([]);
  const [selectedChat, setSelectedChat] = useState({});

  useEffect(() => {
    setChatData(ChatFaceData);
    setSelectedChat(ChatFaceData[0]);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
      <View
        style={{ alignItems: "center", paddingTop: 90, paddingHorizontal: 20 }}
      >
        <Text
          style={{
            color: selectedChat?.primary,
            fontSize: hp(3.4),
            fontWeight: "bold",
          }}
        >
          Hello,
        </Text>
        <Text
          style={{
            fontSize: hp(2),
          }}
        >
          I'm {selectedChat?.name}
        </Text>
        <Image
          source={selectedChat?.image}
          style={{ marginTop: 20, width: wp(40), height: wp(40) }}
        />
        <Text
          style={{
            marginTop: 15,
            fontSize: hp(2),
            textAlign: "center",
            // color: "#B0B0B0",
            opacity: 0.5,
          }}
        >
          {selectedChat?.specialization?.split(":")[1]?.trim()}
        </Text>
        <View
          style={{
            marginTop: 10,
            // backgroundColor: "#F5F5F5",
            alignItems: "center",
            height: wp(34),
            borderRadius: 10,
            padding: 10,
            // width: "100%",
          }}
        >
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={chatData}
            renderItem={({ item, index }) =>
              selectedChat?.id !== item?.id && (
                <TouchableOpacity
                  onPress={() => setSelectedChat(item)}
                  style={{ margin: 15 }}
                >
                  <Image
                    source={item?.image}
                    style={{ width: wp(12), height: wp(12) }}
                  />
                </TouchableOpacity>
              )
            }
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

export default homeScreen;

const styles = StyleSheet.create({});
