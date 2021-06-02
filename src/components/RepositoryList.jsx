import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import useRepositories from '../hooks/useRepositories';
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
    const renderItem = ({ item }) => (
      <RepositoryItem item={item} />
    );
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

  return (
    <RepositoryListContainer repositories={repositories} />
  );
};

export default RepositoryList;