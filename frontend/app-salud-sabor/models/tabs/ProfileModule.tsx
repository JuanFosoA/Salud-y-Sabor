import { View, StyleSheet, Pressable, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SaludSaborTitle from "@/components/atoms/SaludSaborTitle";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ProfileModule = () => {
  const router = useRouter();

  const user = {
    name: "Juan Carlos Mendoza",
    email: "juancarlosmendoza@gmail.com",
    peso: "70 kg",
    altura: "175 cm",
    recetasAsignadas: 8,
  };

  const handleLogout = () => {
    router.push("/(auth)/login");
  };

  const handleUpdate = () => {
    router.push("/updateProfile");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <SaludSaborTitle color="#000" fontSize={28} />
      </View>

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Altura:</Text>
            <Text style={styles.value}>{user.altura}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Peso:</Text>
            <Text style={styles.value}>{user.peso}</Text>
          </View>
        </View>

        <Pressable style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateText}>Actualizar datos</Text>
        </Pressable>

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
  updateButton: {
    backgroundColor: "#F7B040",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 16,
  },
  updateText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
