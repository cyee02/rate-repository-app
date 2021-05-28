import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
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
  }
});

const formatNumber = (num) => {
  if (num >= 1000){
    return(`${Math.round(num / 1000 * 10 ) / 10 }k`);
  } else {
    return num;
  }
};

const StatsTab = ({num, text}) => (
  <View>
    <Text style={styles.data}>{formatNumber(num)}</Text>
    <Text style={styles.dataLabel}>{text}</Text>
  </View>
);

const RepositoryItem = ({ item }) => {
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
            <Text style={styles.textFullName}>{item.fullName}</Text>
            <View style={{ width: 330}}>
              <Text style={styles.description} >{item.description}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.language}>{item.language}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.containerStats}>
          <StatsTab num={item.stargazersCount} text='Stars'/>
          <StatsTab num={item.forksCount} text='Forks'/>
          <StatsTab num={item.reviewCount} text='Reviews'/>
          <StatsTab num={item.ratingAverage} text='Rating'/>
      </View>
    </View>
  );
};

export default RepositoryItem;