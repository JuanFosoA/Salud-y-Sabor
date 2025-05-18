import { View, Text } from 'react-native'
import React from 'react'
import SimpleCard from '@/components/atoms/SimpleCard'
import IndexModule from '@/models/tabs/IndexModule'

const index = () => {
  return (
    <View>
      <Text>Bienvenido</Text>
      <SimpleCard title='Cereal' imageName='https://media.istockphoto.com/id/1290306471/es/foto/anillos-de-ma%C3%ADz-coloridos-en-cuenco-aislados-sobre-fondo-blanco.jpg?s=612x612&w=0&k=20&c=gI5clA4HTZ76Lz-3-6QZahVxFdPM2CTNG6bkSvoYqNM='/>
      <IndexModule/>
    </View>
  )
}

export default index