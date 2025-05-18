import { View, Image, StyleSheet, Dimensions, Text } from 'react-native'
import React from 'react'

interface SimpleCardProps {
  title: string
  imageName: string
}

const SimpleCard: React.FC<SimpleCardProps> = ({ title, imageName}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageName }} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 2 - 24,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 120,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
})

export default SimpleCard