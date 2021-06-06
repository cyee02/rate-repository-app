import React from 'react';
import { StyleSheet } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import { LinearGradient } from 'expo-linear-gradient';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import BodyMassIndexCalculator from './BodyMassIndexCalculator';
import RepositoryView from './RepositoryView'
import SignUp from './SignUp'
import AddReview from './AddReview'

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

        <Route path="/signup" exact>
          <SignUp />
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

        <Route path="/addreview/:ownerName/:repositoryName" exact>
          <AddReview />
        </Route>

        <Redirect to="/repositories" />
      </Switch>
    </LinearGradient>

  );
};

export default Main;