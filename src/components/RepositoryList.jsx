import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  
  const renderItem = ({ item }) => (
    <RepositoryItem
      name={item.fullName}
      description={item.description}
      language={item.language}
      forks={item.forksCount}
      stars={item.stargazersCount}
      rating={item.ratingAverage}
      reviews={item.reviewCount}
      ownerAvatarUrl={item.ownerAvatarUrl}
    />
  );

  return (
    <View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
      />
    </View>
    
  );
};

export default RepositoryList;