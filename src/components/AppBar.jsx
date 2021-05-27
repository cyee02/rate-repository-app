import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Link } from "react-router-native";
import Constants from 'expo-constants';
import theme from '../../assets/theme';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: Constants.statusBarHeight,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: theme.colors.navbar,
  },
  tabText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.mainBold,
    fontSize: theme.fontSize.large,
    paddingLeft: 25
  }
});

const Tab = ({text, link}) => {
  return(
    <Link to={link}>
      <Text style={styles.tabText}>{text}</Text>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Tab text='Repositories' link="/" />
        <Tab text='Sign In' link="/signin" />
        <Tab text='BMI' link="/bmi" />
      </ScrollView>
    </View>
  );
};

export default AppBar;