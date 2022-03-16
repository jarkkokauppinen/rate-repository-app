import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e'
  },
  press: {
    margin: 10
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.press}>
          <Link to='/'>
            <Text fontSize='subheading' color='white'>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable style={styles.press}>
          <Link to='sign'>
            <Text fontSize='subheading' color='white'>Sign in</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;