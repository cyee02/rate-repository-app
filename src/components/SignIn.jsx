import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from '../helper/FormikTextInput';
import theme from '../../assets/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: theme.colors.white,
    height: 250,
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
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return(
    <View style={styles.container}>
      <FormikTextInput style={styles.input} name="username" placeholder="Username" />
      <FormikTextInput style={styles.input} name="password" placeholder="Password" secureTextEntry={true} />
      <View alignItems='center'>
        <Pressable style={styles.pressable} title="Sign In" onPress={onSubmit}>
          <Text style={styles.font} > Sign In </Text>
        </Pressable>
      </View>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;