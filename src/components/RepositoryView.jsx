import React, { useState } from 'react';
import theme from '../../assets/theme';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useParams } from 'react-router-native'
import { format } from 'date-fns'

import { useRepositorySingle } from '../hooks/useRepositories'

import RepositoryItem from './RepositoryItem'
import AddReview from './AddReview'

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
    width: 330,
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
          <Text style={styles.reviewNameText} >{review.user.username}</Text>
          <Text style={styles.datetimeText} >{datetime}</Text>
        </View>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
};

const RepositoryView = () => {
  const [showAddReview, setShowAddReview] = useState(false);
  const [repoInfo, setRepoInfo] = useState();
  const {id} = useParams();
  const { repository } = useRepositorySingle(id);
  if (!repository){
    return (
      <></>
    )
  }
  if (showAddReview) {
    return (
      <AddReview repoInfo={repoInfo} repoID={id} setShowAddReview={setShowAddReview}/>
    )
  }
  return (
    <FlatList
      data={repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem data={item} />}
      keyExtractor={item => item.node.id}
      ListHeaderComponent={() => <View style={{marginBottom: 10}}><RepositoryItem item={repository} singleView={true} setShowAddReview={setShowAddReview} setRepoInfo={setRepoInfo}/></View>}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}

export default RepositoryView