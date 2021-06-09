import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import { useHistory } from 'react-router-native'
import useAuthUser from '../hooks/useAuthUser'
import theme from '../../assets/theme';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 10,
    flexDirection: 'row',
    height: 120,
    backgroundColor: theme.colors.white
  },
  containerStats: {
    display: "flex",
    flexDirection: "row",
    height: 80,
    backgroundColor: theme.colors.white,
    padding: 10,
    justifyContent: "space-evenly",
  },
  tab:{
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    paddingTop: 5
  },
  profileIcon:{
    width: 50,
    height: 50,
    padding: 5,
    borderRadius: 5
  },
  buttonContainer: {
    backgroundColor: theme.colors.white,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  repoButton: {
    backgroundColor: theme.colors.buttons,
    padding: 5,
    margin: 5,
    width: 300,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center'
  },
  // Text related
  textFullName: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.heading,
    fontFamily: theme.fonts.mainBold,
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.normal,
    fontFamily: theme.fonts.main,
  },
  dataLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.normal,
    fontFamily: theme.fonts.main,
    textAlign: 'center',
    paddingTop: 5
  },
  language: {
    fontSize: theme.fontSize.normal,
    fontFamily: theme.fonts.mainThin,
    color: theme.colors.white,
    backgroundColor: theme.colors.buttons,
    flexShrink: 1,
    padding:5,
    borderRadius: 10,
  },
  data:{
    color: theme.colors.textPrimary,
    fontSize: theme.fontSize.large,
    fontFamily: theme.fonts.mainBold,
    textAlign: 'center'
  },
  buttonText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.mainBold,
    fontSize: theme.fontSize.large,
    textAlign: 'center'
  }
});

const formatNumber = (num) => {
  if (num >= 1000){
    return(`${Math.round(num / 1000 * 10 ) / 10 }k`);
  } else {
    return num;
  }
};

const StatsTab = ({num, text, testID}) => (
  <View>
    <Text style={styles.data} testID={testID} >{formatNumber(num)}</Text>
    <Text style={styles.dataLabel}>{text}</Text>
  </View>
);

const RepoButton = ({url, onPress, text}) => {
  return (
    <Pressable onPress={() => onPress(url)} style={styles.repoButton}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  )
}

const RepositoryItem = ({ item, singleView }) => {
  const { user } = useAuthUser(true);
  const history = useHistory();
  const openLink = (url) => {
    Linking.openURL(url)
  }

  const addReview = () => {
    history.push(`/addreview/${item.fullName}`)
  }

  return(
    <View>
      <View style={styles.container}>
        <View style={styles.tab}>
          <Image 
            source={{ uri: item.ownerAvatarUrl }} 
            style={styles.profileIcon}
          />
        </View>
        <View style={styles.tab}>
          <View style={{ paddingLeft: 5 }}>
            <Text style={styles.textFullName} testID="fullName">{item.fullName}</Text>
            <View style={{ width: 330}}>
              <Text style={styles.description} testID="description" >{item.description}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.language} testID="language" >{item.language}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.containerStats}>
          <StatsTab num={item.stargazersCount} text='Stars' testID="stargazersCount"/>
          <StatsTab num={item.forksCount} text='Forks' testID="forksCount"/>
          <StatsTab num={item.reviewCount} text='Reviews' testID="reviewCount"/>
          <StatsTab num={item.ratingAverage} text='Rating' testID="ratingAverage"/>
      </View>
      {singleView ?
        <View style={styles.buttonContainer}>
          <RepoButton url={item.url} onPress={openLink} text='Open in Github'/>
          {user ? <RepoButton url={item.url} onPress={addReview} text='Add Review'/> : null}
        </View>
        : <></>}
    </View>
  );
};

export default RepositoryItem;