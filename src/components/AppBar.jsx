import { useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

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
  const [user, setUser] = useState(null);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate()

  const me = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: false }
  });

  const addUser = () => {
    if (me.data) {
      setUser(me.data.me);
    }
  }

  useEffect(() => {
    addUser();
  }, [me])

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/', { replace: true });
  }
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.press}>
          <Link to='/'>
            <Text fontSize='subheading' color='white'>Repositories</Text>
          </Link>
        </Pressable>
        {user === null ?
        <View style={{flexDirection: 'row'}}>
          <Pressable style={styles.press}>
            <Link to='signIn'>
              <Text fontSize='subheading' color='white'>Sign in</Text>
            </Link>
          </Pressable>
          <Pressable style={styles.press}>
            <Link to='signUp'>
              <Text fontSize='subheading' color='white'>Sign up</Text>
            </Link>
          </Pressable>
        </View> 
        :
        <View style={{flexDirection: 'row'}}>
          <Pressable style={styles.press}>
            <Link to='review'>
              <Text fontSize='subheading' color='white'>Create a review</Text>
            </Link>
          </Pressable>
          <Pressable style={styles.press}>
            <Link to='myReviews'>
              <Text fontSize='subheading' color='white'>My reviews</Text>
            </Link>
          </Pressable>
          <Pressable style={styles.press} onPress={signOut}>
            <Text fontSize='subheading' color='white'>Sign out</Text>
          </Pressable>
        </View>}
      </ScrollView>
    </View>
  );
};

export default AppBar;