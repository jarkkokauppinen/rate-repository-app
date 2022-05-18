import { FlatList, View, Text } from 'react-native'
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries'
import ReviewItem from './ReviewItem';

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true }
  });

  if (!loading) {
    return (
      <FlatList
        data={data.me.reviews.edges}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => <ReviewItem
        rating={item.node.rating} name={item.node.id.substring(37)} id={item.node.id}
        createtime={item.node.createdAt} text={item.node.text} buttons={true} refetch={refetch} />}
      />
    )
  }

  return (
    <View style={{alignSelf: 'center'}}>
      <Text>loading...</Text>
    </View>
  )
};

export default MyReviews;