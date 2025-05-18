import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/molecules/SearchBar";
import { useRouter } from "expo-router";
import SaludSaborTitle from "@/components/atoms/SaludSaborTitle";

const IndexModule = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSearchFocus = () => {
    router.push("/(tabs)/search");
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.horizontalContainer}>
        <View style={{maxWidth: 100}}><SaludSaborTitle /></View>
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Buscar recetas"
          onFocus={handleSearchFocus}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    gap: 10, 
  },
});


export default IndexModule;
