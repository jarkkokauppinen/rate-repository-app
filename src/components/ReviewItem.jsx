import { Pressable, StyleSheet, View, Alert } from 'react-native'
import Text from './Text'
import { format } from 'date-fns'
import { parseISO } from 'date-fns/esm';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    marginTop: 10,
  },
  main: {
    flexDirection: 'row'
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderWidth: 2,
    borderColor: '#0366d6',
    justifyContent: 'center',
    margin: 10
  },
  rating: {
    color: '#0366d6',
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  name: {
    fontWeight: 'bold'
  },
  text: {
    marginTop: 10,
    marginRight: 80
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10
  },
  viewButton: {
    backgroundColor: '#0366d6',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5
  },
  deleteButton: {
    backgroundColor: 'rgb(214, 57, 76)',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5
  }
});

const ReviewItem = ({ rating, name, id, createtime, text, buttons, refetch }) => {
  const navigate = useNavigate();
  const [remove] = useMutation(DELETE_REVIEW);

  const formatTime = time => {
    return format(parseISO(time), 'dd.MM.yyyy');
  }

  const viewRepository = () => {
    navigate(`/${name}`, { replace: true });
  }

  const buttonClick = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', onPress: null },
        { text: 'Delete', onPress: () => {
          remove({ variables: { deleteReviewId: id } });
          refetch();
        }}
      ]
    );
  }
  
  return (
    <View style={styles.background}>
      <View style={styles.main}>
        <View style={styles.circle}>
          <Text style={styles.rating}>{rating}</Text>
        </View>
        <View style={{margin: 10}}>
          <Text style={styles.name}>{name}</Text>
          <Text color='textSecondary'>{formatTime(createtime)}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
        {buttons === true ?
          <View style={styles.buttons}>
            <Pressable onPress={viewRepository}>
              <View style={styles.viewButton}>
                <Text color='white' fontWeight='bold'>View repository</Text>
              </View>
            </Pressable>
            <Pressable onPress={buttonClick}>
              <View style={styles.deleteButton}>
                <Text color='white' fontWeight='bold'>Delete review</Text>
              </View>
            </Pressable>
          </View>
          : <View></View>}
    </View>
  )
};

export default ReviewItem;