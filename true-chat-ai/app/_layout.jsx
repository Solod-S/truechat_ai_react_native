import { Stack, useRouter } from "expo-router";
import React, { Component, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import Toast from "react-native-toast-message";
import { View } from "react-native";

const MainLayout = () => {
  const { user, isAuthenticated, initAuthListener } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = initAuthListener();
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    //  check if the user is authenticated or not
    if (typeof isAuthenticated == "undefined") return;
    if (isAuthenticated) {
      // if user authenticated
      router.replace("home");
    } else {
      // if user is not authenticated
      router.replace("welcome");
    }
  }, [isAuthenticated]);

  return <View className="flex-1 bg-white"></View>;
};

export default function _layout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <Stack.Screen
        name="homeScreen"
        options={{
          presentation: "home",
        }}
      /> */}
        {/* <Stack.Screen
        name="exerciseDetails"
        options={{
          presentation: "modal",
        }}
      /> */}
      </Stack>
      <Toast />
      <MainLayout />
    </View>
  );
}
