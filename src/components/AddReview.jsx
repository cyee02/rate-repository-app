import React from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native'

import theme from '../../assets/theme';
import useReviews from '../hooks/useReviews';
import FormikTextInput from '../helper/FormikTextInput';

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: theme.colors.white,
    height: 500,
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    minWidth: 350,
  },
  pressable: {
    marginTop: 10,
    padding: 10,
    backgroundColor: theme.colors.buttons,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
  },
  font: {
    color: theme.colors.white,
    fontFamily: theme.fonts.main,
    fontSize: theme.fontSize.large,
  }
});

const initialValues = {
  rating: '',
  review: '',
};

export const SignInForm = ({ onSubmit }) => {
  return(
    <View style={styles.container}>
      <FormikTextInput autoCapitalize="none" style={styles.input} name="rating" placeholder="Rating" />
      <FormikTextInput style={[styles.input, {height: 300} ]} multiline={true} name="review" placeholder="Review" />
      <View alignItems='center'>
        <Pressable style={styles.pressable} onPress={onSubmit} >
          <Text style={styles.font} > Create a review </Text>
        </Pressable>
      </View>
    </View>
  );
};

const validationSchema = yup.object().shape({
  rating: yup
    .number()
    .typeError('Input number')
    .min(0)
    .max(100)
    .required('Rating is required')
});

const AddReview = ({ repoInfo, repoID, setShowAddReview }) => {
  const history = useHistory();
  const [addReview] = useReviews();
  const ownerName = repoInfo.split("/")[0];
  const repositoryName = repoInfo.split("/")[1];

  const onSubmit = async (values) => {
    const { rating, review } = values;
    const ratingConverted = parseInt(rating);
    try {
      await addReview({ repositoryName, ownerName, rating: ratingConverted, text: review });
      Alert.alert(`Comment added to repository: ${ownerName}/${repositoryName}`)
      history.push('/repositories')
      // setShowAddReview(false)
    } catch (e) {
      Alert.alert(
        `${e}`
        );
      }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default AddReview;