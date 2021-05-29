import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';
import theme from '../../assets/theme';

import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import BodyMassIndexCalculator from './BodyMassIndexCalculator';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
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

        <Redirect to="/signin" />
      </Switch>
    </View>
  );
};

export default Main;