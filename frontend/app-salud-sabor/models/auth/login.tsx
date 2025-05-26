import SaludSaborTitle from "@/components/atoms/SaludSaborTitle";
import SvgTop from "@/components/atoms/SvgTop";
import { useAuth } from "@/context/AuthConext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginModule = () => {
  const { login_AuthContext } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const response = await fetch("https://zzzbuilds-server.lat/auth/signin/pacient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Accede al token desde los headers
      const token = response.headers.get("authorization")?.replace("Bearer ", "");
      const data = await response.json();

      console.log("data en login: ",data);
      

      if (!response.ok || !token) {
        Alert.alert("Error", data.message || "Credenciales incorrectas");
        return;
      }
      console.log("Token en login: ",token);
      
      Alert.alert("Éxito", "Sesión iniciada");
      await AsyncStorage.setItem("@myToken", token);
      await login_AuthContext();
      router.replace("/(tabs)");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Ocurrió un problema al iniciar sesión");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        backgroundColor="#F7B040"
        barStyle={Platform.OS === "android" ? "dark-content" : "light-content"}
      />

      <SvgTop />
      <SaludSaborTitle color="white" fontSize={40} />

      <View style={styles.form}>
        <TextInput
          placeholder="Usuario"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry={!passwordVisible}
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={styles.loginButton} onPress={login}>
          <Text style={styles.loginText}>Iniciar Sesión</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
    fontSize: 16,
    marginBottom: 30,
    paddingVertical: 8,
  },
  loginButton: {
    backgroundColor: "#F7B040",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  forgotPassword: {
    marginTop: 20,
    textAlign: "center",
    color: "blue",
    fontSize: 14,
  },
});

export default LoginModule;