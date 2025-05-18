import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import IndexModule from './IndexModule'

const FavoriteModule = () => {
  return (
    <SafeAreaView>
      <IndexModule/>
      <Text>Mis recetas</Text>
    </SafeAreaView>
  )
}

export default FavoriteModule