import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "@/components/molecules/SearchBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DetailedCard from "@/components/molecules/DetailedCard";

interface Recipe {
  id: number;
  name: string;
  createdAt: string;
  imageUrl: string;
  // añade aquí otros campos que tengas en la API
}

const SearchModule = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // 1. Recupera el token de AsyncStorage
        const token = await AsyncStorage.getItem("@myToken");
        console.log("Token en recetas: ", token);

        if (!token) {
          throw new Error("No se encontró token de autenticación");
        }

        // 2. Realiza la petición con la cabecera Authorization
        const res = await fetch("https://zzzbuilds-server.lat/recipes", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data: Recipe[] = await res.json();
        console.log(data);

        setRecipes(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error al cargar recetas");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);
  const filteredProducts = recipes.filter(
    (recipe) =>
      recipe.name && recipe.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Buscar Recetas</Text>
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Buscar recetas"
        />
      </View>
      {search.trim().length === 0 && (
        <View style={styles.centered}>
          <Text>Ingresa una palabra para buscar recetas</Text>
        </View>
      )}
      {search.trim().length > 0 && (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <DetailedCard
              name={item.name}
              createdAt={item.createdAt.slice(0, 10)}
              imageName={
                "https://logowik.com/content/uploads/images/chef-restaurant5078.logowik.com.webp"
              }
            />
          )}
          ListEmptyComponent={
            <View style={styles.centered}>
              <Text>No se encontraron recetas.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 16,
    gap: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  listContent: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    marginLeft:70
  },
});

export default SearchModule;
