import React from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { useHistory } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../../assets/theme';
import useSignUp from '../hooks/useSignUp';
import FormikTextInput from '../helper/FormikTextInput';

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 10,
    height: 250,
    justifyContent: 'center',
    marginTop: '50%'
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    minWidth: 350,
    backgroundColor: theme.colors.white
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

export const SignUpForm = ({ onSubmit }) => {
  return(
    <View style={styles.container}>
      <FormikTextInput autoCapitalize="none" style={styles.input} name="username" placeholder="Username" testID="usernameField"/>
      <FormikTextInput autoCapitalize="none" style={styles.input} name="password" placeholder="Password" secureTextEntry={true} testID="passwordField"/>
      <FormikTextInput autoCapitalize="none" style={styles.input} name="passwordConfirmation" placeholder="Password confirmation" secureTextEntry={true} />
      <View alignItems='center'>
        <Pressable style={styles.pressable} onPress={onSubmit} testID="submitButton">
          <Text style={styles.font} > Sign Up </Text>
        </Pressable>
      </View>
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .max(30)
    .min(1)
    .required('Username is required'),
  password: yup
    .string()
    .max(50)
    .min(5)
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do no match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
  const [signUp] = useSignUp();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      Alert.alert( `Your account with username ${username} has been created` );
      history.push("/signin");
    } catch (e) {
      Alert.alert(
        `${e}`
      );
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;