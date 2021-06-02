import React from 'react';
import theme from '../../assets/theme';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import * as Linking from 'expo-linking';
import { useParams } from 'react-router-native'
import { useRepositorySingle } from '../hooks/useRepositories'

import RepositoryItem from './RepositoryItem'

const GitHubButton = ({url}) => {
  const openLink = () => {
    Linking.openURL(url)
  }
  return (
    <View style={{
      backgroundColor: theme.colors.white,
      height: 80,
      alignItems: 'center',
      justifyContent: 'center'}}>
      <Pressable onPress={openLink} style={{
          backgroundColor: theme.colors.buttons,
          padding: 5,
          width: 300,
          height: 50,
          borderRadius: 10,
          justifyContent: 'center'}}>
        <Text style={{
          color: theme.colors.white,
          fontFamily: theme.fonts.mainBold,
          fontSize: theme.fontSize.large,
          textAlign: 'center'
          }}>Open in Github</Text>
      </Pressable>
    </View>
  )
}

const RepositoryView = () => {
  const {id} = useParams();
  const { repository } = useRepositorySingle(id);
  if (!repository){
    return (
      <></>
    )
  }
  return (
    <View>
      <RepositoryItem item={repository} />
      <GitHubButton url={repository.url}/>
    </View>
  )
}

export default RepositoryView