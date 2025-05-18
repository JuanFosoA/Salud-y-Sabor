import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const TabLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen 
            name="index"
            options={{
                title:'Home',
                tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
                headerShown: false
            }} />
        <Tabs.Screen 
            name="search"
            options={{
                title:'Search',
                tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
                headerShown: false
        }} />
        <Tabs.Screen 
            name="favorites"
            options={{
                title:'Favorites',
                tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
                headerShown: false
            }} />
        <Tabs.Screen 
            name="profile"
            options={{
                title:'Profile',
                tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
                headerShown: false
            }} />
    </Tabs>
  )
}

export default TabLayout