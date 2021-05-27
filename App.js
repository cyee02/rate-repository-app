import React from 'react';
import { useFonts } from 'expo-font';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main';

const App = () => {
  const [loaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Pattaya': require('./assets/fonts/Pattaya-Regular.ttf'),
  });
  
  if (!loaded) {
    return null;
  }

  return(
    <NativeRouter>
      <Main />
    </NativeRouter>
  ) ;
};

export default App;