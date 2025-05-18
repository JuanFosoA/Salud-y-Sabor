import { View, Text, StatusBar } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/molecules/SearchBar";
import { useRouter } from "expo-router";

const IndexModule = () => {
  const [search, setSearch] = useState("");

  const handleSearchFocus = () => {
    const router = useRouter();
    router.push("/(tabs)/search"); 
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={"dark-content"} />
      <Text>IndexModule</Text>
      <SearchBar
        search={search}
        setSearch={setSearch}
        placeholder="Buscar resetas"
        onFocus={handleSearchFocus}
      />
    </SafeAreaView>
  );
};

export default IndexModule;
