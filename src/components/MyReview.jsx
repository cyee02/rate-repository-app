import React from 'react'
import theme from '../../assets/theme';
import { StyleSheet, FlatList, View, Text, Pressable, Alert } from 'react-native';
import { useHistory } from 'react-router-native'
import { format } from 'date-fns'

import useAuthUser from '../hooks/useAuthUser'
import useDeleteReview from '../hooks/useDeleteReview';

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
  buttonContainer:{
    display: "flex",
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems:'center',
    height: 50
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
  reviewButton: {
    backgroundColor: theme.colors.buttons,
    padding: 5,
    margin: 5,
    width: '45%',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center'
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
  },
  buttonText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.mainBold,
    fontSize: theme.fontSize.large,
    textAlign: 'center'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ( {data, refetch} ) => {
  const history = useHistory();
  const review = data.node;
  const datetime = format(new Date(review.createdAt), 'dd.MM.yyyy')
  const [deleteReview] = useDeleteReview();

  const openRepo = (id) => {
    history.push(`/repository/${id}`)
  }

  const handledeleteReview = (id, repoFullName) => {
    Alert.alert(
      "Delete Review",
      `Delete your review in ${repoFullName}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: async() => {
          const deleteComplete = await deleteReview({id: id})
          deleteComplete.data.deleteReview ? refetch() : null
        } }
      ]
    );
  }


  return (
    <View>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer} >
          <Text style={styles.ratingText} >{review.rating}</Text>
        </View>
        <View style={styles.reviewContent}>
          <View style={{marginBottom: 20}}>
            <Text style={styles.reviewNameText} >{review.repository.fullName}</Text>
            <Text style={styles.datetimeText} >{datetime}</Text>
          </View>
          <View style={{minHeight: '55%'}}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={() => openRepo(review.repository.id)} style={styles.reviewButton}>
          <Text style={styles.buttonText}>{'View Repository'}</Text>
        </Pressable>
        <Pressable onPress={() => handledeleteReview(review.id, review.repository.fullName)} style={[styles.reviewButton, {backgroundColor: theme.colors.red}]}>
          <Text style={styles.buttonText}>{'Delete'}</Text>
        </Pressable>
      </View>
    </View>
  )
};

const MyReview = () => {
  const { user, refetch } = useAuthUser(true);
  const refetchFn = () => refetch();
  if (!user){
    return (
      <></>
    )
  }
  return (
    <FlatList
      data={user.reviews.edges}
      renderItem={({ item }) => <ReviewItem data={item} refetch={refetchFn} />}
      keyExtractor={item => item.node.id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default MyReview