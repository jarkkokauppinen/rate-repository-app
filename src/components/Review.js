import { View, StyleSheet, Pressable } from 'react-native';
import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations'
import { useNavigate } from 'react-router-native';
 
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
  ownername: yup.string().required('Repository owner name is required'),
  repositoryname: yup.string().required('Repository name is required'),
  rating: yup.number().min(0).max(100).required('Rating is required'),
  review: yup.string()
});

const Review = () => {
  const [newReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const create = async (ownername, repositoryname, rating, text) => {
    const review = {
      'ownerName': ownername,
      'repositoryName': repositoryname,
      'rating': Number(rating),
      'text': text
    };

    const userID = `${ownername}.${repositoryname}`

    newReview({ variables : { review }});

    navigate(`/${userID}`, { replace: true })
  };

  return (
    <View>
      <Formik
        initialValues={{ownername: '', repositoryname: '', rating: '', review: ''}}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          {create(values.ownername, values.repositoryname, values.rating, values.review)}
        }}>
        {(props) => (
          <View style={styles.background}>
            <FormikTextInput name='ownername' placeholder='Repository owner name' />
            <FormikTextInput name='repositoryname' placeholder='Repository name' />
            <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
            <FormikTextInput name='review' placeholder='Review' />
            <Pressable onPress={props.handleSubmit}>
              <View style={styles.button}>
                <Text color='white' fontWeight='bold'>Create a review</Text>
              </View>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Review