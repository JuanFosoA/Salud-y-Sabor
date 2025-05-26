import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SaludSaborTitle from "@/components/atoms/SaludSaborTitle";
import SearchBar from "@/components/molecules/SearchBar";
import DetailedCard from "@/components/molecules/DetailedCard";
import { useRouter } from "expo-router";

interface Recipe {
  id: number;
  name: string;
  createdAt: string;
  imageUrl: string;
  // añade aquí otros campos que tengas en la API
}

const RecipesList = () => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearchFocus = () => {
    router.push("/search");
  };

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

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }
  const filteredProducts = recipes.filter(
    (recipe) =>
      recipe.name &&
      recipe.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
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
      <View style={styles.sectionTitle}>
        <Text>Mis recetas</Text>
      </View>
      {/* Lista de recetas */}
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
    marginTop: 16,
  },
  listContent: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginTop: 24,
    marginBottom: 12,
    marginLeft: 60,
  },
});

export default RecipesList;
