import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Svg, { Ellipse } from "react-native-svg";

const SvgTop = () => {
   return (
    <View testID="svg-top-container" style={styles.svgContainer}>
        <Svg width="500" height="400" viewBox="0 0 390 163" fill="none">
            <Ellipse cx="195" cy="7.5" rx="283" ry="155.5" fill="#F7B040" />
        </Svg>
    </View>
        
    );
}
const styles = StyleSheet.create({
    svgContainer: {
      position: "absolute",
      top: 0,
      bottom: 200,
      width: "100%", // Ocupa todo el ancho
      alignItems: "center",
    }
  })
export default SvgTop