//app/(auth)/_layout

import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/AuthConext";

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#F7B040" },
        headerTintColor: "#fff",
        headerTitle:() => null,
        headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="recipe" options={{ title: "", headerShown: false }} />
    </Stack>
  );
};
export default AuthLayout;
