import RepositoryItem from './RepositoryItem';
import { useQuery } from '@apollo/client';
import { FlatList, View } from 'react-native';
import Text from './Text';
import { useParams } from 'react-router-native';
import { GET_SINGLE_REPOSITORY, GET_REVIEWS } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ data }) => {
  return (
    <View>
      <RepositoryItem
        id={data.id}
        name={data.fullName}
        description={data.description}
        language={data.language}
        forks={data.forksCount}
        stars={data.stargazersCount}
        rating={data.ratingAverage}
        reviews={data.reviewCount}
        ownerAvatarUrl={data.ownerAvatarUrl}
        url={data.url}
        button={true}
      />
    </View>
  )
};

const SingleView = () => {
  const id = useParams(id);

  const userID = id.id
  
  const repositoryQuery = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { userID }
  });

  const { data, loading, fetchMore } = useQuery(GET_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables: { userID, first: 10 }
  });

  const onEndReach = () => {
    const canFetchMore = !loading && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        userID, first: 10
      },
    });
  }

  if (repositoryQuery.data && !loading) {
    return (
      <FlatList
        data={data.repository.reviews.edges}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo data={repositoryQuery.data.repository} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <ReviewItem
        rating={item.node.rating} name={item.node.user.username}
        createtime={item.node.createdAt} text={item.node.text} buttons={false} />}
      />
    );
  }

  return (
    <View style={{alignSelf: 'center'}}>
      <Text>loading...</Text>
    </View>
  )
};

export default SingleView;