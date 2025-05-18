import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import SimpleCard from '../atoms/SimpleCard'

const categoriesItems = [
         
    { id: 1, title: "Breakfast",  imageName:'https://media.istockphoto.com/id/1290306471/es/foto/anillos-de-ma%C3%ADz-coloridos-en-cuenco-aislados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=gI5clA4HTZ76Lz-3-6QZahVxFdPM2CTNG6bkSvoYqNM=' },
    { id: 2, title: "Lunch",  imageName:'https://media.istockphoto.com/id/1290306471/es/foto/anillos-de-ma%C3%ADz-coloridos-en-cuenco-aislados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=gI5clA4HTZ76Lz-3-6QZahVxFdPM2CTNG6bkSvoYqNM=' },
    { id: 3, title: "Dinner",  imageName:'https://media.istockphoto.com/id/1290306471/es/foto/anillos-de-ma%C3%ADz-coloridos-en-cuenco-aislados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=gI5clA4HTZ76Lz-3-6QZahVxFdPM2CTNG6bkSvoYqNM=' },
    { id: 4, title: "Desserts",  imageName:'https://media.istockphoto.com/id/1290306471/es/foto/anillos-de-ma%C3%ADz-coloridos-en-cuenco-aislados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=gI5clA4HTZ76Lz-3-6QZahVxFdPM2CTNG6bkSvoYqNM=' },

]

const CategoriesSection = () => {
  return (
    <View className="mx-5">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoriesItems.map((category) => (
          <SimpleCard key={category.id} title={category.title} imageName={category.imageName} size='small'/>
        ))}
      </ScrollView>
    </View>
  )
}

export default CategoriesSection