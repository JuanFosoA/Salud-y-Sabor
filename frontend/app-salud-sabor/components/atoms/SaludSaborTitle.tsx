import React from "react";
import { Text, View, StyleSheet } from "react-native";

const SaludSaborTitle = ({ color, fontSize}:{color:string,fontSize:number}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color, fontSize }]}>{`SALUD`}</Text>
      <Text style={[styles.text, { color, fontSize }]}>{`&`}</Text>
      <Text style={[styles.text, { color, fontSize }]}>{`SABOR`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontFamily: "serif",
  },
});

export default SaludSaborTitle;
