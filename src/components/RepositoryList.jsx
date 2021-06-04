import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from "react-router-native";

import RepositoryItem from './RepositoryItem';
import theme from '../../assets/theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  sortBarContainer: {
    color: theme.colors.buttons,
    height: 80,
    justifyContent: 'center',
    backgroundColor: 'rgba(52,52,52,0.15)',
    margin: 5,
    borderRadius: 50,
  },
  sortBarText: {
    fontSize: theme.fontSize.normal,
    fontFamily: theme.fonts.mainThin,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  render() {
    const props = this.props;
    const SortBar = props.SortBar

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
        ListHeaderComponent={() => <SortBar />}
      />
    );
  }
}

const SortBar = (sorting, setSorting) => {
  return (
    <View style={styles.sortBarContainer}>
      <Picker
        selectedValue={sorting}
        onValueChange={(itemValue, itemIndex) =>
          setSorting(itemValue)
        }
        itemStyle={styles.sortBarText} >
        <Picker.Item label="Latest" value="latest" />
        <Picker.Item label="Highest Rated" value="highRate" />
        <Picker.Item label="Lowest Rated" value="lowRate" />
      </Picker>
    </View>
  )
}

const RepositoryList = () => {
  const [sorting, setSorting] = useState('latest');
  const { repositories } = useRepositories(sorting);
  const history = useHistory();

  return (
    <RepositoryListContainer repositories={repositories} history={history} SortBar={() => SortBar(sorting, setSorting)}/>
  );
};

export default RepositoryList;