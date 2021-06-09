import React, { useState } from 'react'
import theme from '../../assets/theme';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { format } from 'date-fns'

import useAuthUser from '../hooks/useAuthUser'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewContainer: {
    display: "flex",
    padding: 15,
    flexDirection: 'row',
    height: 200,
    backgroundColor: theme.colors.white
  },
  ratingContainer:{
    width: 60,
    height: 60,
    padding: 10,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: theme.colors.buttons,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingText:{
    color: theme.colors.buttons,
    fontSize: 22,
    fontFamily: theme.fonts.mainBold
  },
  reviewContent: {
    marginLeft: 10,
    width: '60%',
    flexGrow: 1
  },
  reviewNameText: {
    color: theme.colors.textPrimary,
    fontFamily: theme.fonts.mainBold,
    fontSize: theme.fontSize.heading
  },
  datetimeText: {
    color: theme.colors.textSecondary,
    fontSize: theme.fontSize.normal,
    fontFamily: theme.fonts.main
  }
});
const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ data }) => {
  const review = data.node
  const datetime = format(new Date(review.createdAt), 'dd.MM.yyyy')

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer} >
        <Text style={styles.ratingText} >{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <View style={{marginBottom: 5}}>
          <Text style={styles.reviewNameText} >{review.repository.fullName}</Text>
          <Text style={styles.datetimeText} >{datetime}</Text>
        </View>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
};

const MyReview = () => {
  const { user } = useAuthUser(true);
  if (!user){
    return (
      <></>
    )
  }
  return (
    <FlatList
      data={user.reviews.edges}
      renderItem={({ item }) => <ReviewItem data={item} />}
      keyExtractor={item => item.node.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default MyReview