import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

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
    .min(5, 'Username length must be at least 5 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password length must be at least 5 characters')
    .required('Password is required')
});

const SignIn = () => {
  return (
    <View>
      <Formik
        initialValues={{username: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values)
        }}>
        {(props) => (
          <View style={styles.background}>
            <FormikTextInput name='username' placeholder='Username' />
            <FormikTextInput name='password' placeholder='Password' />
            <View style={styles.button}>
              <Pressable onPress={props.handleSubmit}>
                <Text color='white' fontWeight='bold'>Sign in</Text>
              </Pressable>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn