//app/(tabs)/_layout
import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router, Tabs, useRootNavigationState } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthConext";

const TabLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="gear" size={24} color="black" />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
