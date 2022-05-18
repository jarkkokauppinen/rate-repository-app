import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  searchbar: {
    margin: 10
  }
});

const Search = ({ searchQuery, setSearchQuery }) => {
  const onChangeSearch = query => setSearchQuery(query);
  
  return (
    <View style={styles.searchbar}>
      <Searchbar
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </View>
  )
};

export default Search;