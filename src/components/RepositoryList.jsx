import { useState } from 'react'
import { FlatList, View, StyleSheet } from 'react-native';
import { useDebounce } from 'use-debounce';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import Selector from './Selector';
import Search from './Search'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    padding: 20,
    backgroundColor: '#e1e4e8'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const selected = order => {
  switch (order) {
    case 'latest':
      return {direction: 'ASC', order: 'CREATED_AT'}
    case 'highest':
      return {direction: 'DESC', order: 'RATING_AVERAGE'}
    case 'lowest':
      return {direction: 'ASC', order: 'RATING_AVERAGE'}
    default:
      break;
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);
  
  const orders = selected(order);
  const first = 5;

  const { repositories, fetchMore } = useRepositories(orders, searchKeyword, first);
  
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  
  const renderItem = ({ item }) => (
    <RepositoryItem
      id={item.id}
      name={item.fullName}
      description={item.description}
      language={item.language}
      forks={item.forksCount}
      stars={item.stargazersCount}
      rating={item.ratingAverage}
      reviews={item.reviewCount}
      ownerAvatarUrl={item.ownerAvatarUrl}
      button={false}
    />
  );

  const onEndReach = () => {
    fetchMore()
  };

  return (
    <View>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        ListHeaderComponent={() => <Selector order={order} setOrder={setOrder} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default RepositoryList;