import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  main: {
    flexDirection: 'row'
  },
  image: {
    borderRadius: 5,
    width: 50,
    height: 50,
    margin: 10
  },
  specs: {
    marginTop: 10
  },
  text: {
    marginTop: 10,
    marginRight: 80,
    marginBottom: 10
  },
  language: {
    backgroundColor: '#0366d6',
    color: 'white',
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-start'
  },
  counts: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  center: {
    alignItems: 'center'
  }
});

const count = (number) => {
  number = String(number)

 if (number > 999 && number <= 9999) {
    number = `${number.substring(0, 1)}.${number.substring(1, 2)}k`
  }

  if (number > 9999) {
    number = `${number.substring(0, 2)}.${number.substring(2, 3)}k`
  }
  
  return number
}

const RepositoryItem = (props) => {
  return (
    <View style={styles.background}>
      <View style={styles.main}>
        <Image style={styles.image} source={{uri: props.ownerAvatarUrl }} />
        <View style={styles.specs}>
          <Text fontWeight='bold'>{props.name}</Text>
          <Text color='textSecondary' style={styles.text}>{props.description}</Text>
          <Text style={styles.language}>{props.language}</Text>
        </View>
      </View>
      <View>
        <View style={styles.counts}>
          <View style={styles.center}>
            <Text fontWeight='bold'>{count(props.stars)}</Text>
            <Text color='textSecondary'>Stars</Text>
          </View>
          <View style={styles.center}>
            <Text fontWeight='bold'>{count(props.forks)}</Text>
            <Text color='textSecondary'>Forks</Text>
          </View>
          <View style={styles.center}>
            <Text fontWeight='bold'>{count(props.reviews)}</Text>
            <Text color='textSecondary'>Reviews</Text>
          </View>
          <View style={styles.center}>
            <Text fontWeight='bold'>{count(props.rating)}</Text>
            <Text color='textSecondary'>Rating</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;