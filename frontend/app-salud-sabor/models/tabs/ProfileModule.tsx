import { View, StyleSheet, Pressable, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SaludSaborTitle from "@/components/atoms/SaludSaborTitle";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/AuthConext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface User {
  id: number;
  fullname: string;
  username: string;
  email: string;
  password: string;
  document: string;
  documentType: string; 
  disease: string;
  weight: string;  
  height: string;
  role: string; 
  status: string;   
  specialistId: number;
  tokenVersion: number;
  historialMedico: string | null;
  observaciones: string | null;
  createdAt: string;   
  updatedAt: string; 
}

const ProfileModule = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("@myToken");
        if (!token) {
          throw new Error("No se encontró token de autenticación");
        }

        const response = await fetch("https://zzzbuilds-server.lat/pacients/2",{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Datos paciente: ",data);
        
        setUser(data);
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/(auth)/login");
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#F7B040" />
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>No se pudo cargar la información del usuario.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <SaludSaborTitle color="#000" fontSize={28} />
      </View>

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.name}>{user.fullname}</Text>
          <Text style={styles.email}>{user.email}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Altura:</Text>
            <Text style={styles.value}>{user.height}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Peso:</Text>
            <Text style={styles.value}>{user.weight}</Text>
          </View>
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <AntDesign name="logout" size={20} color="white" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginBottom: 24,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
    textAlign: "center",
  },
  email: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 10,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileModule;
