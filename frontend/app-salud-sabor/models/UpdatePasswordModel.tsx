import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const UpdatePasswordModel = () => {
  const router = useRouter();

  const handleSave = () => {
    console.log("Contraseña actualizada");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentTitle}>
        <Text style={styles.title}>Actualizar contraseña</Text>
      </View>

      <TextInput style={styles.input} placeholder="Contraseña antigua" keyboardType="default" />
      <TextInput style={styles.input} placeholder="Nueva contraseña" keyboardType="default" />
      <TextInput style={styles.input} placeholder="Repetir nueva contraseña" keyboardType="default" autoCapitalize="none" />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  contentTitle: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginBottom: 25,
    fontSize: 16,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#f7a834",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default UpdatePasswordModel;
