import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn'
 
const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white'
  },
  button: {
    alignItems: 'center',
    height: 40,
    margin: 12,
    backgroundColor: '#0366d6',
    borderRadius: 5,
    justifyContent: 'center'
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1).max(30)
    .required('Username is required'),
  password: yup
    .string()
    .min(5).max(50)
    .required('Password is required')
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const sign = async (username, password) => {
    try {
      await signIn(username, password);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          {sign(values.username, values.password)}
        }}>
        {(props) => (
          <View style={styles.background}>
            <FormikTextInput name='username' placeholder='Username' />
            <FormikTextInput name='password' placeholder='Password' />
            <Pressable onPress={props.handleSubmit}>
              <View style={styles.button}>
                <Text color='white' fontWeight='bold'>Sign in</Text> 
              </View>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn