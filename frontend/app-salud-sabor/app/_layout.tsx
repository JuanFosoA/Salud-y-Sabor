import { Stack, useRouter } from "expo-router";
import { Suspense, useEffect } from "react";
import { ActivityIndicator } from "react-native";

const HomeLayoutContent = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F7B040",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "bold",
        },
        headerShadowVisible: false,
        headerShown: false,
      }}
    ></Stack>
  );
};

const HomeLayout = () => {
  return (
    <HomeLayoutContent />
  );
};

export default HomeLayout;
