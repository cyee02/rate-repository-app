import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import theme from '../../assets/theme';
import { LinearGradient } from 'expo-linear-gradient';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import BodyMassIndexCalculator from './BodyMassIndexCalculator';
import RepositoryView from './RepositoryView'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    // backgroundColor: theme.colors.background
  },
});

const Main = () => {
  return (
    <LinearGradient colors={['#D5FFFF', '#E5FFFF']} style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/signin" exact>
          <SignIn />
        </Route>

        <Route path="/repositories" exact>
          <RepositoryList />
        </Route>

        <Route path="/bmi" exact>
          <BodyMassIndexCalculator />
        </Route>

        <Route path="/repository/:id" exact>
          <RepositoryView />
        </Route>

        <Redirect to="/repositories" />
      </Switch>
    </LinearGradient>

  );
};

export default Main;