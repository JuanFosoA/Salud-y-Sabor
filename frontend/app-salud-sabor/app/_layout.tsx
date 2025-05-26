import { AuthProvider } from "@/context/AuthConext";
import { Stack } from "expo-router";

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
    >
      <Stack.Screen
        name="recipeDetail"
        options={{ title: "Index", headerShown: false}}
      />
    </Stack>
  );
};

const HomeLayout = () => {
  return (
  <AuthProvider>
    <HomeLayoutContent />
  </AuthProvider>)
};

export default HomeLayout;
