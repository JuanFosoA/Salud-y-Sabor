import { View, Image, StyleSheet, Text, ViewStyle, Pressable } from 'react-native';
import React from 'react';

interface SimpleCardProps {
  title: string;
  imageName: string;
  style?: ViewStyle;
  size?: 'default' | 'small';
  onPress?: () => void;
}

const SimpleCard: React.FC<SimpleCardProps> = ({ 
  title, 
  imageName, 
  style, 
  size = 'default', 
  onPress 
}) => {
  // Estilos base (fuera del componente para mejor rendimiento)
  const baseStyles = StyleSheet.create({
    pressable: {
      borderRadius: 8, // Mismo que el container para que el ripple se vea bien
    },
    container: {
      backgroundColor: "white",
      borderRadius: 8,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    image: {
      width: "100%",
    },
    textContainer: {
      padding: 6,
    },
    title: {
      fontSize: 12,
      fontWeight: "600",
      color: "#333",
      textAlign: 'center',
    }
  });

  // Tamaños específicos
  const sizeStyles = {
    default: {
      container: {
        width: 160,
        height: 180
      },
      image: {
        height: 120
      }
    },
    small: {
      container: {
        width: 100,
        height: 120
      },
      image: {
        height: 70
      }
    }
  };

  const cardContent = (
    <View style={[baseStyles.container, sizeStyles[size].container, style]}>
      <Image 
        source={{ uri: imageName }} 
        style={[baseStyles.image, sizeStyles[size].image]} 
        resizeMode="cover" 
      />
      <View style={baseStyles.textContainer}>
        <Text style={baseStyles.title} numberOfLines={1}>{title}</Text>
      </View>
    </View>
  );

  return onPress ? (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        baseStyles.pressable,
        { opacity: pressed ? 0.8 : 1 },
        sizeStyles[size].container,
        style
      ]}
      android_ripple={{ color: '#f0f0f0' }}
    >
      {cardContent}
    </Pressable>
  ) : (
    cardContent
  );
};

export default SimpleCard;