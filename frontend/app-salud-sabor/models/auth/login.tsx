import SaludSaborTitle from "@/components/atoms/SaludSaborTitle";
import SvgTop from "@/components/atoms/SvgTop";
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
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginModule = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const login = async () => {
    console.log("presione");
    router.replace("/(tabs)")
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        backgroundColor="#F7B040"
        barStyle={Platform.OS === "android" ? "dark-content" : "light-content"}
      />

      <SvgTop></SvgTop>
      <SaludSaborTitle color="white" fontSize={40}></SaludSaborTitle>

      <View
        style={styles.form}
      >
        <TextInput placeholder="Usuario" style={styles.input} />
        <TextInput
          placeholder="Contraseña"
          secureTextEntry={!passwordVisible}
          style={styles.input}
        />

        <Pressable style={styles.loginButton} onPress={login}>
          <Text style={styles.loginText}>Iniciar Sesión</Text>
        </Pressable>

        <Pressable>
          <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>
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
