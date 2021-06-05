import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Searchbar, Button, Menu, Divider, Provider } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import useRepositories from '../hooks/useRepositories';
import { useHistory } from "react-router-native";
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import theme from '../../assets/theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  searchBar: {
    margin: 10,
    borderRadius: 10,
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
  renderHeader = () => {
    const props = this.props;
    const onChangeSearch = query => props.setSearchQuery(query);

    return (
      <View style={{display: "flex"}}>
          <View>
          <View style={styles.sortBarContainer}>
              <Picker
                selectedValue={props.sorting}
                onValueChange={(itemValue, itemIndex) =>
                  props.setSorting(itemValue)
                }
                itemStyle={styles.sortBarText}
              >
                <Picker.Item label="Latest" value="latest" />
                <Picker.Item label="Highest Rated" value="highRate" />
                <Picker.Item label="Lowest Rated" value="lowRate" />
              </Picker>
            </View>
        </View>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={props.searchQuery}
            style={styles.searchBar}
          />
        </View>
      </View>
    )
  }

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
        ListHeaderComponent={this.renderHeader}
        renderItem={renderItem}
      />
    );
  }
}

const RepositoryList = () => {
  const [sorting, setSorting] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryDebounced] = useDebounce(searchQuery, 500)
  const { repositories } = useRepositories(sorting, searchQueryDebounced);
  const history = useHistory();

  const [visible, setVisible] = useState(false)


  return (
    <RepositoryListContainer
      repositories={repositories}
      history={history}
      sorting={sorting}
      setSorting={setSorting}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;