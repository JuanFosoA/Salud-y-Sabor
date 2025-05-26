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
        name="index"
        options={{ title: "Index", headerShown: false}}
      />
      <Stack.Screen
        name="updateProfile"
        options={{ title: "Actualizar datos", headerShown: false}}
      />
      <Stack.Screen
        name="updatePassword"
        options={{ title: "Actualizar contraseña", headerShown: false}}
      />
    </Stack>
  );
};

const HomeLayout = () => {
  return <HomeLayoutContent />;
};

export default HomeLayout;
