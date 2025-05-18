import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'

const TabLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen 
            name="index"
            options={{
                title:'Home',
                tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color="black" />,
                headerShown: false
            }} />
        <Tabs.Screen 
            name="search"
            options={{
                title:'Search',
                tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color="black" />,
                headerShown: false
        }} />
        <Tabs.Screen 
            name="favorites"
            options={{
                title:'Favorites',
                tabBarIcon: ({ color }) => <MaterialIcons name="favorite" size={24} color="black" />,
                headerShown: false
            }} />
        <Tabs.Screen 
            name="profile"
            options={{
                title:'Profile',
                tabBarIcon: ({ color }) => <FontAwesome name="gear" size={24} color="black" />,
                headerShown: false
            }} />
    </Tabs>
  )
}

export default TabLayout