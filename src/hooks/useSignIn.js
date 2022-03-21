import { useEffect } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = ({ username, password }) => {
    const credentials = { 'username': username, 'password': password }
    mutate({ variables : { credentials }})
  };

  const addToken = () => {
    if (result.data) {
      authStorage.setAccessToken(result.data.authenticate.accessToken)
      console.log('access token', result.data.authenticate.accessToken)
      apolloClient.resetStore();
      navigate('/', { replace: true });
    }
  }

  useEffect(() => {
    addToken()
  }, [result])

  return [signIn, result];
};

export default useSignIn;