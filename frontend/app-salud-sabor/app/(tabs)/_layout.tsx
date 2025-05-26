//app/(tabs)/_layout
import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { Redirect, router, Tabs, useRootNavigationState } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthConext";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
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
      <Tabs.Screen
        name="(recipeScreens)"
        options={{
          href: null, 
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
