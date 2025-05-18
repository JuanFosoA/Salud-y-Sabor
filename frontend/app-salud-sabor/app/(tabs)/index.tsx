import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import SimpleCard from '@/components/atoms/SimpleCard';
import IndexModule from '@/models/tabs/IndexModule';
import CategoriesSection from '@/components/molecules/CategoriesSection';
import { router } from 'expo-router';

const index = () => {
  return (
    <View style={styles.container}>
      <IndexModule />
      <View style={styles.content}>
        <View style={styles.horizontalCards}>
          <SimpleCard 
            title='Mis recetas' 
            imageName='https://media.istockphoto.com/id/1290306471/es/foto/anillos-de-ma%C3%ADz-coloridos-en-cuenco-aislados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=gI5clA4HTZ76Lz-3-6QZahVxFdPM2CTNG6bkSvoYqNM='
            style={styles.card}
            onPress={() => router.push('/favorites')}
          />
          <SimpleCard 
            title='Recomendaciones' 
            imageName='https://media.istockphoto.com/id/1290306471/es/foto/anillos-de-ma%C3%ADz-coloridos-en-cuenco-aislados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=gI5clA4HTZ76Lz-3-6QZahVxFdPM2CTNG6bkSvoYqNM='
            style={styles.card}
            onPress={() => router.push('/search')}
          />
        </View>
        {/* <DetailedCard ... /> */}
        <Text>Categorías</Text>
        <View style={styles.categories}>
          <CategoriesSection/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -40,
  },
  horizontalCards: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
    marginBottom: 32,
  },
  categories: {
    marginTop: 32,
  },
  card: {
    flex: 1,
    minWidth: 150,
  },
});

export default index;