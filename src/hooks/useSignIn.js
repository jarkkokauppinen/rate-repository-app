import { useEffect, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import { CREATE_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const navigate = useNavigate();
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);
  const [signUp, signUpResult] = useMutation(CREATE_USER);
  const [userSignUp, setUserSignUp] = useState({})

  const newSign = () => {
    if (signUpResult.data) {
      const credentials = userSignUp
      mutate({ variables : { credentials }})
    }
  }

  const signIn = (username, password, newUser) => {
    if (newUser) {
      const user = { 'username': username, 'password': password }
      setUserSignUp(user)
      signUp({ variables : { user } })
    } else {
      const credentials = { 'username': username, 'password': password }
      mutate({ variables : { credentials }})
    }
  };

  const addToken = () => {
    if (result.data) {
      authStorage.setAccessToken(result.data.authenticate.accessToken);
      console.log('access token', result.data.authenticate.accessToken);
      apolloClient.resetStore();
      navigate('/', { replace: true });
    }
  }

  useEffect(() => {
    newSign()
  }, [signUpResult])

  useEffect(() => {
    addToken()
  }, [result])

  return [signIn, result];
};

export default useSignIn;