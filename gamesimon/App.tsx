/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { store } from './src/redux/store';
import { Provider } from 'react-redux'
import { SafeAreaView, StatusBar, useColorScheme, } from 'react-native';
import RootNavigator from './src/routes/RootNavigator';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: 'rgb(243,243,242)',
    flex: 1
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </SafeAreaView>
  );
};


export default App;