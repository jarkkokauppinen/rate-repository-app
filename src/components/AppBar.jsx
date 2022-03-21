import { useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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

  const me = useQuery(ME, {
    fetchPolicy: 'cache-and-network'
  });

  const addUser = () => {
    if (me.data) setUser(me.data.me);
  }

  useEffect(() => {
    addUser();
  }, [me])

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  }
  
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.press}>
          <Link to='/'>
            <Text fontSize='subheading' color='white'>Repositories</Text>
          </Link>
        </Pressable>
        <Pressable style={styles.press}>
          {user === null ?
          <Link to='sign'>
            <Text fontSize='subheading' color='white'>Sign in</Text>
          </Link> :
          <Pressable onPress={signOut}>
            <Text fontSize='subheading' color='white'>Sign out</Text>
          </Pressable>}
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;