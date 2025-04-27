// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }
import { Stack } from "expo-router";
import React, { Component } from "react";

export default function _layout() {
  return (
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
  );
}
