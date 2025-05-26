import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RecipeDetail {
  id: number;
  name: string;
  createdAt: string;
  imageUrl: string;
  author: string;
  ingredients: string[];
  menus: string[];
  imageName: string;
}

const RecipeDetailModel = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const token = await AsyncStorage.getItem("@myToken");

        const res = await fetch(`https://zzzbuilds-server.lat/recipes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error al obtener la receta:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.centered}>
        <Text>Error al cargar receta</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentheader}>
        <Image
          source={{
            uri: "https://logowik.com/content/uploads/images/chef-restaurant5078.logowik.com.webp",
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title}>{recipe.name}</Text>
          {/* <Text style={styles.author}>➤ Añadido por: {recipe.author}</Text> */}
          <Text style={styles.date}>📅 {recipe.createdAt.slice(0, 10)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Ingredientes</Text>
      <View style={styles.bulletList}>
        {recipe.ingredients.map((item, index) => (
          <Text key={index} style={styles.bulletItem}>
            • {item}
          </Text>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Preparación</Text>
      <View style={styles.steps}>
        {recipe.menus.map((step, index) => (
          <View key={index} style={styles.stepItem}>
            <Text style={styles.stepTitle}>Paso {index + 1}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentheader: {
    flexDirection: "row",
  },
  content: {
    width:220,
    height:150,
    justifyContent:'center'
  },
  image: {
    width: "35%",
    height: 120,
    borderRadius: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },
  author: {
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
  },
  date: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  bulletList: {
    paddingLeft: 8,
  },
  bulletItem: {
    fontSize: 16,
    marginBottom: 4,
  },
  steps: {
    marginTop: 8,
  },
  stepItem: {
    marginBottom: 12,
  },
  stepTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  stepText: {
    fontSize: 15,
    lineHeight: 22,
  },
});

export default RecipeDetailModel;
