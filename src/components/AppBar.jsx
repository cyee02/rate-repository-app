import React from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, Alert } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../../assets/theme';

import { useHistory } from "react-router-native";
import useAuthStorage from '../hooks/useAuthStorage';
import useAuthUser from '../hooks/useAuthUser'
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: Constants.statusBarHeight,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: theme.colors.navbar
  },
  tabText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.mainBold,
    fontSize: theme.fontSize.large,
    paddingLeft: 25
  }
});

const Tab = ({text, link, show}) => {
  if (!show) {
    return null;
  }
  return(
    <Link to={link}>
      <Text style={styles.tabText}>{text}</Text>
    </Link>
  );
};

const SignOutTab = ({data}) => {
  const history = useHistory();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  if (!data) {
    return null;
  }

  const handleSignOut = () => {
    Alert.alert(
      "Signing out",
      `Sign out from user ${data.username}?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: async () => {
          await authStorage.removeAccessToken();
          await apolloClient.resetStore();
          history.push('/signin');
          }
        }
      ]
    );
  };
  return(
    <Pressable>
      <Text style={styles.tabText} onPress={handleSignOut}>Sign Out</Text>
    </Pressable>
  );
};

const AppBar = () => {
  const { user } = useAuthUser(false);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab text='Repositories' link="/repositories" show={true}/>
        <Tab text='BMI' link="/bmi" show={user}/>
        <Tab text='Sign In' link="/signin" show={!user}/>
        <Tab text='My Reviews' link="/myreview" show={user}/>
        <SignOutTab data={user} />
      </ScrollView>
    </View>
  );
};

export default AppBar;