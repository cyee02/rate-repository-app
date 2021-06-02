import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from "react-router-native";

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  render() {
    const props = this.props;

    // Get the nodes from the edges array
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map(edge => edge.node)
      : [];

    const renderItem = ({ item }) => {
      const onPress = () => {
        props.history.push(`/repository/${item.id}`)
      }

      return (
        <Pressable onPress={onPress}>
          <RepositoryItem item={item} />
        </Pressable>
      );
    }
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
      />
    );
  }
}

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const history = useHistory();

  return (
    <RepositoryListContainer repositories={repositories} history={history}/>
  );
};

export default RepositoryList;