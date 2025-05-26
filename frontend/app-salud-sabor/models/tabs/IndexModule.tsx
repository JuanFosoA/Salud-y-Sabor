import { View, Text, StatusBar, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/molecules/SearchBar";
import { useRouter } from "expo-router";
import SaludSaborTitle from "@/components/atoms/SaludSaborTitle";
import SimpleCard from "@/components/atoms/SimpleCard";
import CategoriesSection from "@/components/molecules/CategoriesSection";

const IndexModule = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSearchFocus = () => {
    router.push("/(tabs)/search");
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.horizontalContainer}>
        <View style={{ maxWidth: 100, flex: 1 }}>
          <SaludSaborTitle color="#000" fontSize={20} />
        </View>
        <View style={{ flex: 3 }}>
          <SearchBar
            search={search}
            setSearch={setSearch}
            placeholder="Buscar recetas"
            onFocus={handleSearchFocus}
          />
        </View>
      </View>

      <View style={styles.cardsWrapper}>
        <View style={styles.horizontalCards}>
          <SimpleCard
            title="Mis recetas"
            imageName="https://media.istockphoto.com/id/1290306471/es/foto/anillos-de-ma%C3%ADz-coloridos-en-cuenco-aislados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=gI5clA4HTZ76Lz-3-6QZahVxFdPM2CTNG6bkSvoYqNM="
            style={styles.card}
          />
          <SimpleCard
            title="Recomendaciones"
            imageName="https://media.istockphoto.com/id/1290306471/es/foto/anillos-de-ma%C3%ADz-coloridos-en-cuenco-aislados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=gI5clA4HTZ76Lz-3-6QZahVxFdPM2CTNG6bkSvoYqNM="
            style={styles.card}
          />
        </View>
        {/* <DetailedCard ... /> */}
        <Text>Categorías</Text>
        <View style={styles.categories}>
          <CategoriesSection />
        </View>
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
  cardsWrapper: {
    width: "100%",
    justifyContent:'center',
    marginTop: 120,
  },
  horizontalCards: {
    flexDirection: "row",
    gap: 12,
    marginTop: 32,
    marginBottom: 32,
    justifyContent: "center",
  },
  categories: {
    marginTop: 32,
  },
  card: {
    flex: 1,
    minWidth: 150,
  },
  container: {
    alignItems: "center",
  },
});

export default IndexModule;
