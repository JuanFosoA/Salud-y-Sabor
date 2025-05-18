import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const LoginModule = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const login = async () => {
    console.log("presione");
    router.replace("/(tabs)")
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <StatusBar barStyle={"dark-content"} backgroundColor={"#F7B040"} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <TextInput style={styles.input} placeholder="Correo electrónico" />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputPassword}
              placeholder="Contraseña"
              secureTextEntry={!showPassword}
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </Pressable>
          </View>
          <View style={styles.login}>
            <Pressable style={styles.loginButton} onPress={login}>
              <Text style={styles.textWhite}>Iniciar Sesión</Text>
            </Pressable>

            <Pressable style={styles.resetPasswordContainer}>
              <Text style={styles.resetPassword}>
                ¿Olvidaste la contraseña?
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#F7B040",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
    fontSize: 30,
  },
  textWhite: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    fontSize: 20,
    width: 300,
    height: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    textAlign: "left",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  login: {
    marginTop: 30,
    fontSize: 15,
    alignItems: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginTop: 30,
  },
  inputPassword: {
    flex: 1,
    fontSize: 20,
    height: 55,
    paddingHorizontal: 20,
  },
  eyeIcon: {
    padding: 10,
  },
  resetPasswordContainer: {
    marginTop: 16,
    paddingVertical: 8,
    alignItems: "center",
  },

  resetPassword: {
    color: "blue",
    fontSize: 16,
    textAlign: "center",
  },
});
export default LoginModule;
