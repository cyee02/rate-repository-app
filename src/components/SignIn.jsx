import React from 'react';
import { StyleSheet, View, Text, Pressable, Alert } from 'react-native';
import { useHistory } from "react-router-native";
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../../assets/theme';
import useSignIn from '../hooks/useSignIn';
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

export const SignInForm = ({ onSubmit, handleSignUp }) => {
  return(
    <View style={styles.container}>
      <FormikTextInput autoCapitalize="none" style={styles.input} name="username" placeholder="Username" testID="usernameField"/>
      <FormikTextInput autoCapitalize="none" style={styles.input} name="password" placeholder="Password" secureTextEntry={true} testID="passwordField"/>
      <View alignItems='center'>
        <Pressable style={styles.pressable} onPress={onSubmit} testID="submitButton">
          <Text style={styles.font} > Sign In </Text>
        </Pressable>
        <Pressable style={[styles.pressable, {backgroundColor: 'transparent'}]} onPress={handleSignUp} >
          <Text style={[styles.font, {color: theme.colors.textPrimary, fontSize: theme.fontSize.normal}]} > Sign Up </Text>
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
  const [signIn] = useSignIn();
  const history = useHistory();

  const handleSignUp = () => {
    history.push('/signup')
  }

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      history.push("/repositories");
    } catch (e) {
      Alert.alert(
        `${e}`
      );
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} handleSignUp={handleSignUp}/>}
    </Formik>
  );
};

export default SignIn;