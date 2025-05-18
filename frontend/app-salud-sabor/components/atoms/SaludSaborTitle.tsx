import React from "react";
import { Text, View, StyleSheet } from "react-native";

const SaludSaborTitle = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SALUD</Text>
      <Text style={styles.text}>&</Text>
      <Text style={styles.text}>SABOR</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "serif",
  },
});

export default SaludSaborTitle;
