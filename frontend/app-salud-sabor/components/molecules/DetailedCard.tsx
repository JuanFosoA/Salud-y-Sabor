import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

interface DetailedCardProps {
  name: string
  createdAt: string
  imageName: string
  isFavorite?: boolean
  onToggleFavorite?: () => void
}

const DetailedCard: React.FC<DetailedCardProps> = ({
    name,
    createdAt,
    imageName,
    isFavorite = false,
    onToggleFavorite,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageName }} style={styles.image} resizeMode="cover" />
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.author}>{createdAt}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: "#666",
  },
  favoriteButton: {
    padding: 8,
  },
})

export default DetailedCard