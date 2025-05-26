//app/(auth)/_layout

import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/AuthConext";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (isAuthenticated) {
    return <Redirect href="/" />;
  }
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#F7B040" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="login" options={{ title: "", headerShown: false }} />
    </Stack>
  );
};
export default AuthLayout;
