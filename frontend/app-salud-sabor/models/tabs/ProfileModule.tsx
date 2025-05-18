import { View, StyleSheet, Pressable, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SaludSaborTitle from "@/components/atoms/SaludSaborTitle";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ProfileModule = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/(auth)/login");
  };

  const handleUpdate = () => {
    router.push("/updateProfile");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <SaludSaborTitle color="#000" fontSize={20} />
      </View>

      <View style={styles.container}>
        <Text style={styles.name}>Juan Carlos Mendoza</Text>
        <Text style={styles.email}>juancarlosmendoza@gmail.com</Text>

        <Pressable style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateText}>Actualizar datos</Text>
        </Pressable>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <AntDesign name="logout" size={24} color="white" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 24,
    color: "#555",
  },
  updateButton: {
    backgroundColor: "#f7a834",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 24,
  },
  updateText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileModule;
