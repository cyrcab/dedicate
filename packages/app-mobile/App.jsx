import React from 'react';
import Main from "./src/pages/Main";
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import store from "./src/store/store"
import { colors } from './src/theme';
import { Provider } from 'react-redux';
import PermissionHandler from './src/components/PermissionHandler';

const theme = {
  ...DefaultTheme,
  colors: colors,
};
function App() {

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <PermissionHandler />
        <Main />
      </PaperProvider>
    </Provider>
  );
}

export default App;
