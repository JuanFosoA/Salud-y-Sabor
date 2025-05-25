import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@/components/molecules/SearchBar';

const SearchModule = () => {
  const [search, setSearch] = useState("");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Buscar Recetas</Text>
        <SearchBar
          search={search}
          setSearch={setSearch}
          placeholder="Buscar recetas"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
    gap: 10,
    alignItems:'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SearchModule;
