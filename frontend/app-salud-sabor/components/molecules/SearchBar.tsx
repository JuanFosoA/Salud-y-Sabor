import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SearchBar = ({ search, setSearch, placeholder ,onFocus}:{search: string, setSearch: (text: string) => void,placeholder: string,onFocus?: () => void}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={search}
        onChangeText={setSearch}
        onFocus={onFocus}
      />
      <AntDesign testID="search-icon" name="search1" size={24} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderColor:'#A6A4A4',
    borderWidth: 1, 
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 20,
  }
});

export default SearchBar;
