import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
    return <Stack
    screenOptions={{
      headerStyle: { backgroundColor: "#F7B040" },
      headerTintColor: "#fff",
      headerTitleStyle: { fontSize: 18, fontWeight: "bold" },
      headerShadowVisible: false, // Elimina la sombra
    }}
  >
    <Stack.Screen name="login" options={{ title: "" }} />
    <Stack.Screen name="register" options={{ title: "" }} />
  </Stack>
}
export default AuthLayout